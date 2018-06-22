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

const pickValue = (list, listPicker) => (
    listPicker
        ? list[listPicker[Math.floor(Math.random() * listPicker.length)]]
        : list[Math.floor(Math.random() * list.length)]
);

export const userList = _.map(
    _.sortBy(names, name => name.surname+name.name),
    name => _.extend(name, {
        population: pickValue(populations, populationPicker),
        status: pickValue(statuses, statusPicker),
        pwStatus: pickValue(pwStatuses, pwPicker),
        email: `${name.name.toLowerCase()}.${name.surname.toLowerCase()}@the.company.com`,
        department: pickValue(departments),
        recentLogin: new Date(Date.now() - (Math.random() * 1000 * 60 * 60 * 24 * 365)),
        failedLogins: pickValue(failedLoginsPicker),
        countryCode: pickValue(countryCodes, countryCodePicker),
    })
);