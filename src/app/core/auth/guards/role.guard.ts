import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivateChild,
	RouterStateSnapshot
} from "@angular/router";

type RoleActions = Array<{
	_id: string;
	name: string;
	createdAt: Date;
	frontRoute: string;
}>;

@Injectable({
	providedIn: "root"
})
export class RoleGuard implements CanActivateChild {
	public static filterMenuItems(menuItems: any[]) {
		let actions: RoleActions = JSON.parse(localStorage.actions);
		return (
			menuItems
				.filter(
					item =>
						!item.page ||
						actions.some(action =>
							RoleGuard.checkMatch(item.page, action.frontRoute)
						)
				)
				// remove repeating sections
				.filter((value, index, array) => {
					// check if last item is a section
					if (array.length === index + 1 && value.section) {
						return false;
						// check if current item is a section and next item is also a section
					} else if (value.section) {
						return !(array[index + 1] || {}).section;
					}
					return true;
				})
		);
	}

	private static checkMatch(url: string, frontRoute: string): boolean {
		if (frontRoute.includes("*")) {
			return new RegExp(frontRoute.replace(/\*/g, ".*")).test(url);
		} else {
			return url === frontRoute;
		}
	}

	public canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) {
		if (state.url == "/auth/login" || state.url == "/")
			return true;
		const actions: RoleActions = JSON.parse(localStorage.actions);
		return actions.some(action =>
			RoleGuard.checkMatch(state.url, action.frontRoute)
		);
	}
}
