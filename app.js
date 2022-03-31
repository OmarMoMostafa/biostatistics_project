// selections
const input = document.querySelector("input");
const generateBtn = document.querySelector(".generate");
const table = document.querySelector(".result-table");
const results = document.querySelector('.calculated-results')

// table variables
let x = []; //tt
let sumX; //done
let mean; //done
let x_mean = []; //tt //done
let SUMx_mean; //done
let x_meanSq = []; //tt //done
let SUMx_meanSq; //done

// calculation variables
let median; //done
let mode; //done
let range;
let variance; //S
let standardDeviation; //SD
let standardError; //SE
/*----------------------------------------------- */

// functions
const getSum = (...values) => {
  let res = 0;
  values.forEach((value) => {
    res += value;
  });
  return res;
};

const getMean = (...values) => {
  return getSum(...values) / values.length;
};

const getX_mean = (...values) => {
  const result = [];
  values.forEach(value => result.push(value - getMean(...values)));
  return result;
}

const getX_meanSq = (...x_mean) => {
  const result = [];
  x_mean.forEach(val => result.push(Math.pow(val, 2)));
  return result;
}

const getMedian = (...values) => {
  values = values.sort(function(a, b){return a-b});
  if (values.length % 2 !== 0) {
    return values[((values.length + 1) / 2) - 1];
  } else {
    let index =0;
    index = Math.floor((values.length + 1) /2) -1
    return (values[index] + values[index + 1]) /2
  }
};

const getMode = (n, ...values) => {
           
        // Sort the array
        values.sort();
           
        // find the max frequency using linear
        // traversal
        let max_count = 1, res = values[0];
        let curr_count = 1;
           
        for (let i = 1; i < n; i++)
        {
            if (values[i] == values[i - 1])
                curr_count++;
            else
            {
                if (curr_count > max_count)
                {
                    max_count = curr_count;
                    res = values[i - 1];
                }
                curr_count = 1;
            }
        }
       
        // If last element is most frequent
        if (curr_count > max_count)
        {
            max_count = curr_count;
            res = values[n - 1];
        }
        return res;
}

const getRange = (...values) => {
  return Math.max(...values) - Math.min(...values);
}

const getVariance = (sumX_meanSq, n) => {
  return sumX_meanSq / (n-1);
}

const getSD = (variance) =>{
  return Math.sqrt(variance)
}

const getSE = (sd, n) => {
  return sd/Math.sqrt(n)
}
/*----------------------------------------------------------*/

// UI functions
const addXtoTable = (x, x_mean, x_meanSQ) => {

  for(i=0; i<=x.length-1; i++) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${x[i]}</td>
        <td>${x_mean[i]}</td>
        <td>${x_meanSQ[i]}</td>
    `;
    table.appendChild(tr)
  }

  const lastTr = document.createElement('tr');
  lastTr.classList.add('sum-row')
  lastTr.innerHTML = `
  <td>${sumX}</td>
  <td>${SUMx_mean}</td>
  <td>${SUMx_meanSq}</td>
  `;
  table.appendChild(lastTr)
};

const getUserVals = () => {
  let vals = [];
  vals = input.value.toString().split(',');
  vals.forEach(val => {
    val = +val;
    x.push(val)
  })
}

const assignVals = () => {
  sumX = getSum(...x)
  mean = getMean(...x)
  median = getMedian(...x)
  x_mean = getX_mean(...x)
  SUMx_mean = getSum(...x_mean)
  x_meanSq = getX_meanSq(...x_mean)
  SUMx_meanSq = getSum(...x_meanSq)
  mode = getMode(x.length, ...x)
  range = getRange(...x)
  variance = getVariance(SUMx_meanSq, x.length)
  standardDeviation = getSD(variance)
  standardError = getSE(standardDeviation, x.length)
}

const renderCaledRes = () => {
  results.innerHTML = `
    mean = ${mean} <br>
    median = ${median} <br>
    mode = ${mode} <br>
    range = ${range} <br>
    variance (s^2) = ${variance} <br>
    standard deviation (sd) = ${standardDeviation} <br>
    standard error (se) = ${standardError}
  `;
}

const resetAll = () => {
  x=[]
  
  table.innerHTML = `
    <tr>
      <th>x</th>
      <th>x-x¯</th>
      <th>(x-x¯)^2</th>
    </tr>
  `;

  results.innerHTML = "";
}

const genetateBtnHandler = () => {
  resetAll();

  getUserVals();

  assignVals();

  addXtoTable(x, x_mean, x_meanSq)

  renderCaledRes()
}

generateBtn.addEventListener('click', genetateBtnHandler)