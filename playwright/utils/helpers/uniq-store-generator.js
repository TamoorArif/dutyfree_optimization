function generateUniqueStoreName(baseName = "DutyFreeStore") {
    const timestamp = Date.now(); // current time in milliseconds
    return `${baseName}_${timestamp}`;
}

export default generateUniqueStoreName;