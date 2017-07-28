import * as rp from "request-promise-native";
export function execute(opt: any) {
    return rp(opt);
}
