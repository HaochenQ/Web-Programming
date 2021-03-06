import mpg_data from "./data/mpg_data";
import {getStatistics} from "./medium_1";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    
    get avgMpg(){
        let result={};
        let totalCity=0;
        let totalHighway=0;
        for (let i=0;i<mpg_data.length;i++){
            totalCity += mpg_data[i]['city_mpg'];
            totalHighway += mpg_data[i]['highway_mpg'];
        }
        const avgcity = totalCity/mpg_data.length;
        const avghighway = totalHighway/mpg_data.length;
        result['city']=avgcity;
        result['highway']=avghighway;
        return result;
    },
    get allYearStats(){
      let years =[];
      for(let i=0;i<mpg_data.length;i++){
          years.push(mpg_data[i]['year'])
      }  
      const result = getStatistics(years);
      return result;
    },
    get ratioHybrids(){
        let hybr = 0;
        let nonhy = 0;
        for(let i=0;i < mpg_data.length ;i++){
            if (mpg_data[i]['hybrid']==true){
                hybr++;
            }else{
                nonhy++;
            }
        }
        return hybr/(hybr+nonhy);
    },
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    get makerHybrids(){
        let result =[];
        let allmakes = [];
        //get all makes
        for(let i=0;i<mpg_data.length;i++){
            if(!allmakes.includes(mpg_data[i]['make']) && mpg_data[i]['hybrid']){
                allmakes.push(mpg_data[i]['make'])
            }
        }
        //insert hybrid cars
        for(let i=0;i<allmakes.length;i++){
            let onemake = {}
            let ids = []
            onemake['make']=allmakes[i]
            for(let j=0;j<mpg_data.length;j++){
                if(mpg_data[j]['make']==allmakes[i]&&mpg_data[j]['hybrid']){
                    ids.push(mpg_data[j]['id'])
                }
            }
            onemake['hybrids'] = ids
            result.push(onemake);
        }
        return result;
        
    },



    get avgMpgByYearAndHybrid(){
        let result = {};
        let years = [];
        //get list of years
        for(let i=0;i<mpg_data.length;i++){
            if(!years.includes(mpg_data[i]['year'])){
                years.push(mpg_data[i]['year'])
            }
        }
        for(let i =0;i<years.length;i++){
            result[years[i]]={}
            let hyb_data={}
            let nonhyb_data={} 
            let hbcity=0
            let nonhbcity=0
            let hbhigh=0
            let nonhbhigh=0
            let count1 =0
            let count2 =0
            for(let j=0;j<mpg_data.length;j++){

                if(mpg_data[j]['year']==years[i]&&mpg_data[j]['hybrid']){
                    hbcity+=mpg_data[j]['city_mpg']
                    hbhigh+=mpg_data[j]['highway_mpg']
                    count1++
                }else if(mpg_data[j]['year']==years[i]&&!mpg_data[j]['hybrid']){
                    nonhbcity+=mpg_data[j]['city_mpg']
                    nonhbhigh+=mpg_data[j]['highway_mpg']
                    count2++
                }
            }
            hyb_data.city = hbcity/count1;
            hyb_data.highway = hbhigh/count1;
            nonhyb_data.city=nonhbcity/count2;
            nonhyb_data.highway=nonhbhigh/count2;
            result[years[i]]['hybrid']=hyb_data;
            result[years[i]]['notHybrid']=nonhyb_data
        }


        /*
        //insert data in result{}
        for(let i =0;i<years.length;i++){
            for(let j=0;j<mpg_data.length;j++){
                //for hybrid
                if (mpg_data[j]['hybrid']&&mpg_data[j]['year']==years[i]){
                    //for hybrid -> city
                    result[years[i]]={}
                    result[years[i]]['hybrid']={}
                    result[years[i]]['hybrid']['city']=function(){
                        let eachcity = 0;
                        let count =0
                        for(let z=0;z<mpg_data.length;z++){
                            if (mpg_data[z]['hybrid']&&mpg_data['year']==years[i]){
                                eachcity += mpg_data[z]['city_mpg'];
                                count ++;
                            }
                        }
                        let avcity = eachcity/count
                        return avcity;    
                    }
                    //for hybrid -> highway
                    result[years[i]]['hybrid']['highway']=function(){
                        let eachhighway = [];
                        for(let z=0;z<mpg_data.length;z++){
                            if (mpg_data[z]['hybrid']&&mpg_data['year']==years[i]){
                                eachhighway.push(mpg_data[j]['highway_mpg'])
                            }
                        }
                        return eachhighway.reduce((accumulator,currentValue)=>accumulator+currentValue,0)/eachhighway.length;
                    }
                }
                //for nothybrid
                else if((!mpg_data[j]['hybrid']&&mpg_data[j]['year']==years[i])){
                    //for nothybrid -> city
                    result[years[i]]={}
                    result[years[i]]['notHybrid']={}
                    result[years[i]]['notHybrid']['city']=function(){
                        let eachcity = [];
                        for(let z=0;z<mpg_data.length;z++){
                            if (!mpg_data[z]['hybrid']&&mpg_data['year']==years[i]){
                                eachcity.push(mpg_data[z]['city_mpg'])
                            }
                        }
                        return eachcity.reduce((accumulator,currentValue)=>accumulator+currentValue,0)/eachcity.length;
                    }
                    //for nothybrid -> highway
                    result[years[i]]['notHybrid']['highway']=function(){
                        let eachhighway = [];
                        for(let z=0;z<mpg_data.length;z++){
                            if (!mpg_data[z]['hybrid']&&mpg_data['year']==years[i]){
                                eachhighway.push(mpg_data[j]['highway_mpg'])
                            }
                        }
                        return eachhighway.reduce((accumulator,currentValue)=>accumulator+currentValue,0)/eachhighway.length;
                    }
                
                }
            }
        }*/
    return result;
}
};
console.log(moreStats.avgMpgByYearAndHybrid)
console.log('HI')