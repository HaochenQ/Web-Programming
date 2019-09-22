import {variance} from "./data/stats_helpers";


/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = array.reduce(function(accumulator,currentValue){return accumulator + currentValue},0);
    return sum;
    }


/**
 * Calculates the mean of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 *              2,2,2,3,4,5,5,6,7,7
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    if(array.length ===0) return 0;

    array.sort(function(a,b){
        return a-b;
    });

    const half = Math.floor(array.length / 2);

    if (array.length % 2)
        return array[half];

    return (array[half - 1] + array[half]) / 2.0;
        /*let mid = Math.floor(array.length/2);  
        arr=array.sort((a,b)=>{a-b});
        return array.length%2 ===1 ? arr[mid]:(arr[mid]+arr[mid-1])/2;*/
    }


/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {

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
/*function getStatistics(array) {
    
    return {length:array.length, 
            sum: array.reduce((a,b)=>{a+b},0), 
            mean: this.sum/this.length, 
            median: getMedian(array),
            min: array.min,
            max: array.max,
            variance: variance(array,this.mean),
            standard_deviation: Math.sqrt(this.variance)
        };

}*/

