const {createDefaultPreset} = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
	testEnvironment: "node",
	transform: {
		...tsJestTransformCfg,
	},
	testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Path to your setup file
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
