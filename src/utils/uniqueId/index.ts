
import { v4 as uuidv4 } from "uuid";

/**
 * Generates a unique ID.
 * @param condition A condition that will generate a new unique ID until it's false.
 * @returns 
 */
const uniqueId = (condition: boolean = false) => {
  let id: string = uuidv4();
    
  while (condition) {
    id = uuidv4();
  }

  return id;
}

export default uniqueId;
