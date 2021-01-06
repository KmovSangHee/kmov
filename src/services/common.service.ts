export const returnRequest = (status: string, msg:any) => {
    return {
        resultCode: status,
        data:msg
    };
};