import { parsePhoneNumber } from "react-phone-number-input";

export type PhoneCountryOption = {
    code: string;
    name: string;
};

export function getPhoneCountry(
    value: string | undefined,
    countryList: PhoneCountryOption[],
): PhoneCountryOption {
    const iso = value ? parsePhoneNumber(value)?.country : undefined;

    const country = iso 
        ? countryList.find((item) => item.code === iso)
        : undefined;

    return {
        code: country?.code ?? "",
        name: country?.name ?? "",
    };
}