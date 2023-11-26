export function checkRentalDate(
  projectDate: Date,
  checkInDate: Date,
  checkOutDate: Date,
): boolean {
  if (projectDate >= checkInDate && projectDate <= checkOutDate) {
    return true;
  } else {
    return false;
  }
}
