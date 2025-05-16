import { ExitRegisterData, movementData } from "../types/types";

export const tagCheck = (str: string): boolean => {
  return /^[A-Z]{3}[0-9]{6}$/.test(str);
};

export const serialCheck = (str: string): boolean => {
  return /^[A-Z0-9]{10,20}$/.test(str);
};

export const nameCheck = (str: string): boolean => {
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  return nameRegex.test(str);
};

export const numCheck = (str: string): boolean => {
  const numRegex = /^[0-9]{3,}$/;
  return numRegex.test(str);
};
export const filterTag = (assets: any[], searchTag: string): any[] => {
  if (!searchTag) return assets;
  return assets.filter((asset) => {
    return asset.tag.toLowerCase() === searchTag.toLowerCase();
  });
};

export function fizzBuzz(n: any) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

export const filterAssets = (assets: any[], searchTerm: string) => {
  if (!searchTerm) return assets;

  return assets.filter((asset) => {
    const searchFields = [
      asset.user,
      asset.tag,
      asset.serial_no,
      asset.model,
      asset.createdAt,
    ];

    return searchFields.some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

export const filterRepairs = (repairs: any[], searchTerm: string) => {
  if (!searchTerm) return repairs;

  return repairs.filter((repair) => {
    const searchFields = [
      repair.vendor,
      repair.tag,
      repair.serial_no,
      repair.group,
      repair.branch,
      repair.createdAt,
    ];

    return searchFields.some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

export const filterMovements = (
  movements: movementData[],
  searchTerm: string
) => {
  if (!searchTerm) return movements;

  return movements.filter((movement) => {
    const searchFields = [
      movement.tag,
      movement.serial_no,
      movement.to_location,
      movement.recipient,
    ];

    return searchFields.some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

export const filterExits = (exits: ExitRegisterData[], searchTerm: string) => {
  if (!searchTerm) return exits;

  return exits.filter((exit) => {
    const searchFields = [
      exit.tag,
      exit.serial_no,
      exit.location,
      exit.name,
      exit.date_Of_Exit,
      exit.current_custodian,
      exit.supervisor,
    ];

    return searchFields.some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

export const handlePrint = (movement: movementData) => {
  sessionStorage.setItem("movement", JSON.stringify(movement));
  return;
};
