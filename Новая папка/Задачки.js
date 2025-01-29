// var twoSum = function(nums, target) {
//     nums.sort((a, b) => a - b);
//     let left = 0;
//     let right = nums.length - 1
    
//     while(left != right) {
//         let tmp = nums[left] + nums[right]
//         if (tmp === target) {
//             return [left, right]
//         } 
// 		if(tmp < target) {
// 			left++
//             continue
// 		} 
// 			right--
//     }

// 	return null
// }

// console.log(twoSum([2,7,11,15], 9))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var palindrom = function(x) {
// 	return x.toString().split('').reverse().join('') === x.toString()
// }

// console.log(palindrom(121))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var romanToInt = function(s) {
// 	let result = 0;
//     const obj = {
// 		'I': 1,
// 		'V': 5, 
// 		'X': 10,
// 		'L': 50,
// 		'C': 100,
// 		'D': 500,
// 		'M': 1000 
// 	}

// 	for(let i = 0; i < s.length; i++) {
// 		let curr = obj[s[i]];
// 		let next = obj[s[i + 1]]

// 		if(curr < next) {
// 			result += next - curr
// 			i++
// 		} else {
// 			result += curr
// 		}
// 	}
// 	return result;
// };

// console.log(romanToInt("IIIV"))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ДОДЕЛАТЬ!!!!!!!

// var isValid = function(s) {

// 	const obj = {
// 		'(': 1,
// 		')': -1,
// 		'[': 10,
// 		']': -10,
// 		'{': 100,
// 		'}': -100
// 	}
//     let res = 0
	
//     for(let i = 0; i < s.length; i++) {
// 		res += obj[s[i]]
//     }

//     if(res === 0) {
//         return true
//     }
//     return false
// };

// console.log(isValid('([)]'))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const obj1 = {
// 	value: 1,
// 	next: {
// 		value: 2,
// 		next: {
// 			value: 4,
// 			next: null
// 		}
// 	}
// }

// const obj2 = {
// 	value: 1,
// 	next: {
// 		value: 3,
// 		next: {
// 			value: 4,
// 			next: null
// 		}
// 	}
// }

// var mergeTwoLists = function(list1, list2) {
// 	return list1.next
// }

// console.log(mergeTwoLists(obj1, obj2));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var removeDuplicates = function(nums) {
//     const set = new Set(nums)
//     return [...set]
// };

// console.log(removeDuplicates([1, 2, 3, 1, 1, 4]))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function findUniq(arr) {
// 	let result = null

// 	arr.forEach(item => {
// 		arr.indexOf(item) > 0 ? result = item : null
// 	})

// 	return result
//   }
  

// console.log(findUniq([ 1, 0, 0 ]))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function arrayDiff(a, b) {
// 	const arr = [];
	
// 	a.forEach(item => {
// 	  item === b ? null : arr.push(item)
// 	})
	
// 	return arr
//   }

//   console.log(arrayDiff([1, 2], [1]))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function rle(str) {
// 	const arr = [];
// 	let count = 1;

// 	for(let i = 0; i < str.length; i++) {
// 		if(str[i] === str[i + 1]) {
// 			count++
// 		} else {
// 			arr.push(count + str[i])
// 			count = 1;
// 		}
// 	}

// 	return arr.join('').replaceAll('1', '');
// }

// console.log(rle('AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD'));

// // 'A3V3B2VXDHJ4F6DH4A3J2DSL3S4D'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TODO

function getTargetElement(arr, target) {
	arr.sort((a,b) => a - b)
	let left = 0
	let right = arr.length - 1

	while(left <= right) {
		let current = Math.floor((left + right)/2)

		if(arr[current] === target) {
			return current
		} else if(target > arr[current]) {
			left = current + 1
		} else if(target < arr[current]) {
			right = current - 1
		}
	}
}

let arr = [2, 7, 10, 3, 5, 11, 22, 6, 4, 14, 13]
let target = 13;

console.log(getTargetElement(arr, target))