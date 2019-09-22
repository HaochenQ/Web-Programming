function getStatistics(array) {

    const len = array.length;
    const su = array.reduce(function(accumulator,currentValue)
                {return accumulator + currentValue},0);
    const me = su / len;
    const v = variance(array,me);
    const d = Math.sqrt(v);
    
    return {length:len, 
            sum: su, 
            mean: me,
            median: getMedian(array),
            min: Math.min(...array),
            max: Math.max(...array),
            variance: v,
            standard_deviation: d
        };
}
console.log(getStatistics([3,2,4,5,5,5,2,6,7]))


/*unction variance(array, mean) {
    return array.map(function (sample) {
        return Math.pow(mean - sample, 2);
    })
        .reduce(function sum(m, v) {
            m += v;
            return m;
        }, 0) / array.length;
}

function getMedian(array) {
    const mid =Math.floor(array.length/2);  
    arr=array.sort((a,b)=>{a-b});
    return array.length%2 !==0? arr[mid]:(arr[mid]+arr[mid-1])/2;
}

function getSum(array) {
    let sum = array.reduce(function(accumulator,currentValue){return accumulator + currentValue},0);
    return sum;
    }

function getStatistics(array) {

    const len = array.length;
    const su = getSum(array);
    const me = su / len;
    const v = variance(array,me);
    const d = Math.sqrt(v);

    return {length:array.length, 
            sum: getSum(array), 
            mean: me,
            median: getMedian(array),
            min: Math.min(...array),
            max: Math.max(...array),
            variance: v,
            standard_deviation: d
        };
}
const a = getStatistics([3,2,4,5,5,5,2,6,7]);
console.log(a);
*/

