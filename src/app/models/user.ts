/** A registered short-course user. Dates are stored as YYYY-MM-DD strings. */
export class User {
  constructor(
    public userEmail: string,
    public userPassword: string,
    public userFirstName: string,
    public userLastName: string,
    public userTel: string,
    public dateOfBirth: string | null | undefined
  ) {}

  getFullName(): string {
    return `${this.userFirstName} ${this.userLastName}`;
  }

  getAge(referenceDate: Date = new Date()): number {
    const dateText = this.dateOfBirth;
    if (typeof dateText !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateText)) {
      throw new Error('Date of birth must use YYYY-MM-DD.');
    }

    const [year, month, day] = dateText.split('-').map(Number);
    const birth = new Date(year, month - 1, day);
    // new Date() normalizes impossible dates (for example 2024-02-30).
    if (birth.getFullYear() !== year || birth.getMonth() !== month - 1 || birth.getDate() !== day) {
      throw new Error('Date of birth is invalid.');
    }
    if (birth.getFullYear() > referenceDate.getFullYear() ||
        (birth.getFullYear() === referenceDate.getFullYear() && birth.getMonth() > referenceDate.getMonth()) ||
        (birth.getFullYear() === referenceDate.getFullYear() && birth.getMonth() === referenceDate.getMonth() && birth.getDate() > referenceDate.getDate())) {
      throw new Error('Date of birth cannot be in the future.');
    }

    let age = referenceDate.getFullYear() - year;
    if (referenceDate.getMonth() + 1 < month ||
        (referenceDate.getMonth() + 1 === month && referenceDate.getDate() < day)) {
      age--;
    }
    return age;
  }
}
