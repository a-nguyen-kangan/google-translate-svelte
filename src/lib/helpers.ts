export const mapResults = (results: string) : any => {
    let data = JSON.parse(results);
    let result = {};
    console.log("data: ", data[0]);
    for(const attr in data[0]) {
        console.log(attr, data[0][attr]);
        result = {...result, [attr]: data[data[0][attr]]};
    }

    console.log("result: ", result);

    return {
        result: result
    }
}