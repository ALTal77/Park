const OO = 1e18;

let numSeats, numColors, target;

let a = Array(101).fill(0);
let cost = Array.from({ length: 101 }, () => Array(101).fill(0));
let dp = Array.from({ length: 101 }, () => Array.from({ length: 101 }, () => Array(102).fill(-1)));


function calc(idx, beauty, prevColor) {
    if (idx === numSeats) {
        return (beauty === target) ? 0 : OO;
    }

    let ret = dp[idx][beauty][prevColor];
    if (ret !== -1) return ret;

    ret = OO;

    if (a[idx] !== 0) {
        ret = calc(idx + 1, beauty + (prevColor !== a[idx] ? 1 : 0), a[idx]);
    } else {
        for (let i = 1; i <= numColors; i++) {
          
            ret = Math.min(ret, cost[idx][i] + calc(idx + 1, beauty + (prevColor !== i ? 1 : 0), i));
        }
    }

    dp[idx][beauty][prevColor] = ret;
    return ret;
}


function main(input) {
    const data = input.trim().split('\n');
    [numSeats, numColors, target] = data[0].split(' ').map(Number);
    a = data[1].split(' ').map(Number);

    for (let i = 0; i < numSeats; i++) {
        const row = data[i + 2].split(' ').map(Number);
        for (let j = 1; j <= numColors; j++) {
            cost[i][j] = row[j - 1];
        }
    }

    dp = Array.from({ length: 101 }, () => Array.from({ length: 101 }, () => Array(102).fill(-1)));
    let ans = calc(0, 0, numColors + 1);

    return ans === OO ? -1 : ans;
}
