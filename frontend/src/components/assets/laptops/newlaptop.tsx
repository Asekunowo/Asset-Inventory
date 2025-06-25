import {Bank, Branch, laptopModels} from "@/store/data";
import {DEFAULT_ASSET_DATA, errorMessages} from "@/types/definitions";
import {Assets} from "@/types/types";
import {nameCheck, serialCheck, tagCheck} from "@/utils/functions";
import {SERVER_URI} from "@/utils/secrets";
import {Box, Button, Field, HStack, Input, Text} from "@chakra-ui/react";
import Papa from "papaparse";
import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import CustomSelect from "../../reusable/customselect";
import Spin from "../../ui/spinner";
import {toaster} from "../../ui/toaster";

const Newasset = () => {
	const [loading, setLoading] = useState<boolean>(false);
	type OutletContextType = {
		userData: {firstname: string; lastname: string};
		addAsset: any;
	};

	const {userData, addAsset} = useOutletContext<OutletContextType>();

	const [AssetData, setAssetData] = useState<Assets>(DEFAULT_ASSET_DATA);

	const handleClear = () => {
		setAssetData(DEFAULT_ASSET_DATA);
	};

	const validateForm = () => {
		const requiredFields: (keyof Assets)[] = ["user", "tag", "serial_no", "model", "group", "role", "branch", "entity"];

		const emptyFields = requiredFields.filter((field) => !AssetData[field] || AssetData[field].includes("--"));

		if (emptyFields.length > 0) {
			toaster.create({
				type: "error",
				title: "Required fields are empty",
				description: `Please fill in: ${emptyFields.join(", ").toUpperCase()}`,
				duration: 5000,
			});
			return false;
		}

		if (!nameCheck(AssetData.user)) {
			toaster.create({
				type: "error",
				title: "Invalid Name",
				description: errorMessages.name,
			});
			return false;
		}

		if (!nameCheck(AssetData.group)) {
			toaster.create({
				type: "error",
				title: "Invalid Name",
				description: errorMessages.name,
			});
			return false;
		}

		if (!nameCheck(AssetData.role)) {
			toaster.create({
				type: "error",
				title: "Invalid Name",
				description: errorMessages.name,
			});
			return false;
		}
		if (!tagCheck(AssetData.tag)) {
			toaster.create({
				type: "error",
				title: "Invalid Tag Number",
				description: errorMessages.tag,
				duration: 5000,
			});
			return false;
		}

		if (!serialCheck(AssetData.serial_no)) {
			toaster.create({
				type: "error",
				title: "Invalid Serial Number",
				description: errorMessages.serialNumber,
			});
			return false;
		}

		return true;
	};

	const handleAddAsset = async () => {
		try {
			if (!validateForm()) {
				setLoading(false);
				return;
			}

			const {success, message} = await addAsset(AssetData);

			toaster.create({
				type: success ? "success" : "error",
				title: message,
			});

			success && window.location.replace("../assets");
			success && handleClear();
		} catch (error) {
			toaster.create({
				type: "error",
				title: "Error",
				description: "Failed to add asset. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};
	const [BatchAssetData, setBatchAssetData] = useState<[Assets]>([DEFAULT_ASSET_DATA]);

	const handleFileChange = (event: any) => {
		const file = event.target.files[0];
		if (file && file.type === "text/csv") {
			console.log(file);
			console.log(`File selected: ${file.name}`);
			parseCsvForPreview(file);
		} else {
			console.log(null);
			console.log("Please select a valid CSV file.");
			setBatchAssetData([DEFAULT_ASSET_DATA]);
		}
	};

	const parseCsvForPreview = (file: any) => {
		Papa.parse(file, {
			header: true, // Assuming first row is headers
			skipEmptyLines: true,
			preview: 10, // Only parse the first 10 rows for preview
			complete: (results: any) => {
				if (results.errors.length) {
					console.error("CSV Parsing Error (Preview):", results.errors);
					toaster.create({
						title: "CSV Preview Error.",
						description: results.errors[0].message,
						type: "error",
						duration: 5000,
					});
					setBatchAssetData([DEFAULT_ASSET_DATA]); // Clear any partial data
				} else {
					setBatchAssetData(results.data);
					console.log(results.data);
				}
			},
			error: (err) => {
				console.error("PapaParse Error:", err);
				toaster.create({
					title: "CSV Parsing Error.",
					description: "Could not parse file for preview.",
					duration: 5000,
				});
				setBatchAssetData([DEFAULT_ASSET_DATA]);
			},
		});
	};

	const renameKeys = (data: any[], keyMap: Record<string, string>) => {
		return data.map((obj) => {
			const newObj: Record<string, any> = {};
			for (const key in obj) {
				const newKey = keyMap[key] || key;
				newObj[newKey] = obj[key];
			}
			return newObj;
		});
	};

	const keyMap = {
		TYPE: "type",
		USER: "user",
		TAG: "tag",
		"SERIAL NO": "serial_no",
		MODEL: "model",
		GROUP: "group",
		ROLE: "role",
		BANK: "entity",
		BRANCH: "branch",
	};

	const renamedData = renameKeys(BatchAssetData, keyMap);
	// console.log(renamedData);

	const [upload, setUpload] = useState(false);

	const handleBatchUpload = async () => {
		setUpload(true);
		const res = await fetch(`${SERVER_URI}/api/assets/newbatch`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(renamedData),
		});

		const {success, message} = await res.json();

		toaster.create({
			type: success ? "success" : "error",
			title: message,
		});

		setUpload(false);
		success && window.location.replace("../assets");
	};

	return (
		<Box>
			<HStack justifyContent={"space-between"} mb={5}>
				<Box rounded={"md"} p={"0.5rem"} outline={1} w={"max-content"} mb={7} outlineColor={"black"} outlineStyle={"solid"}>
					<Text fontWeight={"bold"}>Add New Laptop</Text>
				</Box>
				<HStack alignItems={"flex-end"} justifyContent={"center"}>
					<Field.Root id="csv-upload">
						<Field.Label>Select CSV File</Field.Label>
						<Input type="file" accept=".csv" onChange={handleFileChange} p={1} />
					</Field.Root>
					<Button onClick={handleBatchUpload} disabled={BatchAssetData.length == 1}>
						{upload ? <Spin /> : "Upload"}
					</Button>
				</HStack>
			</HStack>

			{BatchAssetData.length > 130 && (
				<Box mt={6} p={4} borderWidth="1px" borderRadius="md" overflowX="auto">
					<Text fontSize="lg" fontWeight="semibold" mb={3}>
						CSV Preview:
					</Text>
					<table>
						<thead>
							<tr>
								{Object.keys(BatchAssetData[0]).map((header, index) => (
									<th key={index}>{header}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{BatchAssetData.slice(0, 5).map(
								(
									row,
									rowIndex, // Show first 5 rows
								) => (
									<tr key={rowIndex}>
										{Object.values(row).map((cell, cellIndex) => (
											<td className="w-max" key={cellIndex}>
												{cell}
											</td>
										))}
									</tr>
								),
							)}
						</tbody>
					</table>
					{BatchAssetData.length > 5 && (
						<Text fontSize="sm" color="gray.500" mt={2}>
							... showing first 5 rows out of {BatchAssetData.length}
						</Text>
					)}
				</Box>
			)}

			<form className="grid p-5 grid-cols-2 gap-6 w-full">
				<Input
					value={"SUBMITTED BY: " + userData.firstname + " " + userData.lastname}
					disabled
					textTransform={"uppercase"}
					fontWeight={"bold"}
					_disabled={{bg: "gray.400"}}
				/>
				<Input value={"TYPE: " + AssetData.type} disabled fontWeight={"bold"} textTransform={"uppercase"} _disabled={{bg: "gray.400"}} />
				<Input placeholder="User" value={AssetData.user} onChange={(e) => setAssetData({...AssetData, user: e.target.value})} />
				<Input
					placeholder="Asset Tag"
					value={AssetData.tag}
					type="text"
					onChange={(e) => setAssetData({...AssetData, tag: e.target.value.toUpperCase()})}
				/>
				<Input
					placeholder="Serial No"
					value={AssetData.serial_no}
					onChange={(e) =>
						setAssetData({
							...AssetData,
							serial_no: e.target.value.toUpperCase(),
						})
					}
				/>

				<CustomSelect
					defaultValue="LAPTOP MODEL"
					value={AssetData.model || "LAPTOP MODEL"}
					onChange={(value) => setAssetData({...AssetData, model: value})}
					options={laptopModels}
				/>
				<Input
					placeholder="Group"
					value={AssetData.group}
					onChange={(e) => setAssetData({...AssetData, group: e.target.value.toUpperCase()})}
				/>
				<Input placeholder="Role" value={AssetData.role} onChange={(e) => setAssetData({...AssetData, role: e.target.value.toUpperCase()})} />

				<CustomSelect
					defaultValue="ENTITY"
					value={AssetData.entity || "ENTITY"}
					onChange={(value) => setAssetData({...AssetData, entity: value})}
					options={Bank}
				/>

				<CustomSelect
					defaultValue="BRANCH"
					value={AssetData.branch || "BRANCH"}
					onChange={(value) => setAssetData({...AssetData, branch: value})}
					options={Branch}
				/>

				<HStack>
					<Button
						disabled={loading}
						variant={"subtle"}
						minW={"5.6rem"}
						colorPalette={"green"}
						onClick={() => {
							setLoading(true);
							handleAddAsset();
						}}>
						{loading ? <Spin /> : "Submit"}
					</Button>
					<Button colorPalette={"red"} variant={"surface"} onClick={() => handleClear()}>
						Clear
					</Button>
				</HStack>
			</form>
		</Box>
	);
};

export default Newasset;
