import _ from "underscore";
import names from "./names.json";

export const populations = [
    "US Employees",
    "UK Employees",
    "Canada Employees",
    "Germany Employees",
    "India Employees",
    "Israel Employees",
    "Japan Employees",
];

export const statuses = [
    "Enabled",
    "Disabled",
    "Account OK",
    "Pre-provisioned",
    "Invited",
    "Registration Abandoned",
    "Expired"
];

export const pwStatuses = [
    "Good",
    "Reset Requested",
    "Expired"
];

export const departments = [
    "Accounting",
    "Business Development",
    "Human Resources",
    "Legal",
    "Product Management",
    "Research and Development",
    "Sales",
    "Services",
    "Training",
];

export const countryCodes = [
    "US",
    "UK",
    "CA",
    "FR",
    "DE",
    "IS",
    "IT",
    "JP",
    "KR",
    "MX",
    "SE",
    "CH",
];

export const customFilters = {
    department: {
        label: "Department",
        mode: "comparison"
    },
    recentLogin: {
        label: "Recent Login",
        mode: "date"
    },
    failedLogins: {
        label: "Failed Login Attempts",
        mode: "comparison"
    },
    countryCode: {
        label: "Country Code",
        mode: "comparison"
    },
    org: {
        label: "Org. Employed By",
        mode: "comparison"
    },
    badgeNumber: {
        label: "Badge #",
        mode: "comparison"
    },
    hireDate: {
        label: "Hire Date",
        mode: "date"
    },
    specialty: {
        label: "Specialty",
        mode: "comparison"
    },
};

export const operators = [
    "=",
    "Starts With",
];

const populationPicker = [0,0,0,0,1,1,1,2,2,2,2,3,3,4,4,5,6];
const statusPicker = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,3,4,4,4,5,5,6,6,6,6];
const pwPicker = [0,0,0,0,0,0,0,0,1,2];
const failedLoginsPicker = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,50];
const countryCodePicker = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,3,3,4,5,6,7,8,9,10,11];

const pickValue = (i, list, listPicker) => (
    listPicker
        ? list[listPicker[(i * 3) % listPicker.length]]
        : list[(i * 3) % list.length]
);

export const userList = _.map(
    _.sortBy(names, name => name.surname+name.name),
    (name, index) => _.extend(name, {
        population: pickValue(index, populations, populationPicker),
        status: pickValue(index, statuses, statusPicker),
        pwStatus: pickValue(index, pwStatuses, pwPicker),
        email: `${name.name.toLowerCase()}.${name.surname.toLowerCase()}@the.company.com`,
        department: pickValue(index, departments),
        recentLogin: new Date(1450000000000 + (index * 6.3 * 60 * 60 * 24 * 365)),
        failedLogins: pickValue(index, failedLoginsPicker),
        countryCode: pickValue(index, countryCodes, countryCodePicker),
    })
);