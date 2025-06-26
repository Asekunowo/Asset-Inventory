import {movementData} from "@/types/types";
import {Button, Flex, Heading, HStack, Icon, Input, Table, TableBody, TableColumnHeader, TableHeader, TableRow, Text, VStack} from "@chakra-ui/react";
import {IoSearch} from "react-icons/io5";
import {Link} from "react-router-dom";

const MovementsTable = ({movements, handlePrint, setSearch}: any) => {
	return (
		<div>
			<Flex m={3} justify={"space-between"} alignItems={"center"}>
				<Heading>MOVEMENTS </Heading>
				<HStack pos={"relative"} mr={5}>
					<Input minW={"14rem"} p={2} placeholder="Search" variant={"flushed"} onChange={(e) => setSearch(e.target.value)} />
					<Icon pos={"absolute"} right={0} size={"lg"}>
						<IoSearch />
					</Icon>
				</HStack>
			</Flex>
			<Table.ScrollArea>
				<Table.Root variant={"outline"} stickyHeader showColumnBorder borderRadius={"md"}>
					<TableHeader>
						<TableRow>
							<TableColumnHeader w={"3px"}>S/N</TableColumnHeader>
							<TableColumnHeader>Type</TableColumnHeader>
							<TableColumnHeader>Tag</TableColumnHeader>
							<TableColumnHeader>Serial Number</TableColumnHeader>
							<TableColumnHeader>TO</TableColumnHeader>
							<TableColumnHeader>New Custodian</TableColumnHeader>
							<TableColumnHeader>Bank</TableColumnHeader>
							<TableColumnHeader textAlign={"end"} w={"20px"}>
								Action
							</TableColumnHeader>
						</TableRow>
					</TableHeader>
					<TableBody>
						{movements.map((movement: movementData, index: number) => (
							<TableRow key={index}>
								<TableColumnHeader w={"3px"}>{index + 1}</TableColumnHeader>
								<TableColumnHeader>{movement.type}</TableColumnHeader>
								<TableColumnHeader>{movement.tag}</TableColumnHeader>
								<TableColumnHeader>{movement.serial_no}</TableColumnHeader>
								<TableColumnHeader>{movement.to_location}</TableColumnHeader>
								<TableColumnHeader>{movement.newCustodian}</TableColumnHeader>
								<TableColumnHeader>{movement.bank}</TableColumnHeader>
								<TableColumnHeader textAlign={"end"} spaceX={"2rem"}>
									<Button
										onClick={() => {
											handlePrint(movement);
										}}>
										<Link to={"form"}>Print</Link>
									</Button>
								</TableColumnHeader>
							</TableRow>
						))}
					</TableBody>
				</Table.Root>
			</Table.ScrollArea>
			<VStack m={3} p={3}>
				<Text color={"gray.500"}>**Only movements created today will be displayed**</Text>
			</VStack>
		</div>
	);
};

export default MovementsTable;
