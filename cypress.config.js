import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

async function setupNodeEvents(on,config){
	on(
		'file:preprocessor',
		createBundler()
	);
	//Make sure to return the config object as ir might have been modifeed by the plugin
	return config;
}

export default defineConfig({
	// Whether Cypress will record a video of the test run when running on headless:
	video: false,
	reporter: 'junit',
	reporterOptions: {
		mochaFile: 'results/Report.xml',
		toConsole: true,
	},
	e2e: {
			setupNodeEvents,
			specPattern:[
				'cypress/e2e/**/*.cy.*'
			],
		},
	env:{
		baseUrl: 'https://www.saucedemo.com',
		swagLabs: {
			endpoint: {
				inventory: '/inventory.html',
				cart: '/cart.html',
			},
			login: {
				users: {
					correctUser: 'standard_user',
					correctPass: 'secret_sauce',
					lockUser: 'locked_out_user',
					problemUser: 'problem_user',
					passInv: 'invalid_password',
					glitchUser: 'performance_glitch_user',
					userInv: 'invalid_username',
				},
				errorMsg: {
					lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
					PassOrUserInv: 'Epic sadface: Username and password do not match any user in this service',
					UserNull: 'Epic sadface: Username is required',
					PassNull: 'Epic sadface: Password is required',
				},
			},
		},
	},
})
