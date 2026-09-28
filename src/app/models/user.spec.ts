import { User } from './user';

describe('User.getAge — lab test cases (reference date: 2024-05-20)', () => {
  const today = new Date(2024, 4, 20);
  const ageFor = (dob: string | null | undefined): number =>
    new User('test@example.com', 'password123', 'Test', 'User', '0891234567', dob).getAge(today);

  it('TC-01: birthday passed this year → 34', () => expect(ageFor('1990-01-01')).toBe(34));
  it('TC-02: today is birthday → 34', () => expect(ageFor('1990-05-20')).toBe(34));
  it('TC-03: birthday not yet arrived → 33', () => expect(ageFor('1990-12-31')).toBe(33));
  it('TC-04: born today → 0', () => expect(ageFor('2024-05-20')).toBe(0));
  it('TC-05: leap-year birthday → 24', () => expect(ageFor('2000-02-29')).toBe(24));
  it('TC-06: future date → error', () => expect(() => ageFor('2025-01-01')).toThrowError());
  it('TC-07: wrong date format → error', () => expect(() => ageFor('31/02/1990')).toThrowError());
  it('TC-08: null and undefined → errors', () => {
    expect(() => ageFor(null)).toThrowError();
    expect(() => ageFor(undefined)).toThrowError();
  });
  it('TC-09: maximum lifespan → 124', () => expect(ageFor('1900-01-01')).toBe(124));
  it('TC-10: one day before birthday → 33', () => expect(ageFor('1990-05-21')).toBe(33));
});
