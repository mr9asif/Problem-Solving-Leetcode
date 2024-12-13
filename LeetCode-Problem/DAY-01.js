// //  13-12-2024



// **Question**:

// You are given an array of integers `nums`. The task is to compute a score by repeatedly selecting and marking elements from the array as follows:

// 1. Choose the smallest integer from the array that has not been marked. If there is a tie, choose the one with the smallest index.
// 2. Add the value of the chosen integer to the score.
// 3. Mark the chosen integer and its two adjacent elements (if they exist).
// 4. Repeat the above steps until all elements in the array are marked.

// Write an efficient algorithm to compute the score.

// ---

// **Example**:

// Input: `nums = [5, 4, 3, 2, 1]`  
// Output: `6`  

// **Explanation**:
// - Choose 1 (smallest), mark it and its neighbor 2. Remaining array: `[5, 4, x, x, x]`.
// - Choose 3 (smallest unmarked), mark it and its neighbor 4. Remaining array: `[5, x, x, x, x]`.
// - Choose 5 (only remaining), mark it. Final array: `[x, x, x, x, x]`.
// - Total score = 1 + 3 + 5 = 6.

// ---

// **Solution Approaches**:

// ### **Solution 1: Brute Force (Naive Approach)**

// **Steps**:
// 1. Use a boolean array `marked` to track whether an element is marked.
// 2. Iterate over the array repeatedly to find the smallest unmarked element.
// 3. Mark the selected element and its neighbors, and update the score.
// 4. Stop when all elements are marked.

// **Code**:

// ```java
// class Solution {
//     public long findScore(int[] nums) {
//         boolean[] marked = new boolean[nums.length];
//         long score = 0;

//         while (!allMarked(marked)) {
//             int minIndex = -1;
//             int minValue = Integer.MAX_VALUE;

//             // Find the smallest unmarked element
//             for (int i = 0; i < nums.length; i++) {
//                 if (!marked[i] && nums[i] < minValue) {
//                     minValue = nums[i];
//                     minIndex = i;
//                 }
//             }

//             // Mark the chosen element and its neighbors
//             marked[minIndex] = true;
//             if (minIndex > 0) marked[minIndex - 1] = true;
//             if (minIndex < nums.length - 1) marked[minIndex + 1] = true;

//             // Add the value of the chosen element to the score
//             score += nums[minIndex];
//         }

//         return score;
//     }

//     private static boolean allMarked(boolean[] marked) {
//         for (boolean m : marked) {
//             if (!m) return false;
//         }
//         return true;
//     }
// }
// ```

// **Complexity**:
// - **Time Complexity**: \(O(n^2)\), as we iterate over the array to find the smallest unmarked element for each marking operation.
// - **Space Complexity**: \(O(n)\), for the `marked` array.

// ---

// ### **Solution 2: Optimized Using Priority Queue (Min-Heap)**

// **Steps**:
// 1. Use a `PriorityQueue` (min-heap) to efficiently track the smallest unmarked element.
// 2. Store each element as a pair `{value, index}` in the heap.
// 3. Process elements in ascending order, marking the selected element and its neighbors.
// 4. Skip already marked elements.

// **Code**:

// ```java
// import java.util.PriorityQueue;

// class Solution {
//     public long findScore(int[] nums) {
//         int n = nums.length;
//         boolean[] marked = new boolean[n];
//         long score = 0;

//         // Priority Queue to store elements with their indices
//         PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> {
//             if (a[0] != b[0]) return Integer.compare(a[0], b[0]); // Sort by value
//             return Integer.compare(a[1], b[1]); // If values are equal, sort by index
//         });

//         // Add all elements to the priority queue
//         for (int i = 0; i < n; i++) {
//             pq.offer(new int[] {nums[i], i}); // {value, index}
//         }

//         // Process elements in ascending order
//         while (!pq.isEmpty()) {
//             int[] current = pq.poll();
//             int value = current[0];
//             int index = current[1];

//             // Skip if already marked
//             if (marked[index]) continue;

//             // Mark the current element and its neighbors
//             marked[index] = true;
//             if (index > 0) marked[index - 1] = true;
//             if (index < n - 1) marked[index + 1] = true;

//             // Add value to score
//             score += value;
//         }

//         return score;
//     }
// }
// ```

// **Complexity**:
// - **Time Complexity**: \(O(n \log n)\), due to the heap operations.
// - **Space Complexity**: \(O(n)\), for the heap and `marked` array.

// ---

// **Comparison**:

// | Approach       | Time Complexity | Space Complexity | Notes                              |
// |----------------|-----------------|------------------|------------------------------------|
// | Brute Force    | \(O(n^2)\)       | \(O(n)\)          | Simpler but slower for large input |
// | Optimized Heap | \(O(n \log n)\)  | \(O(n)\)          | Efficient for large input          |

// ---

// Choose the optimized heap solution for competitive programming or large test cases.



// ----------------------------

// **Problem Description:**
// Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to the `target`.

// You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

// ---

// ### Example

// #### Input:
// ```plaintext
// nums = [2, 7, 11, 15]
// target = 9
// ```

// #### Output:
// ```plaintext
// [0, 1]
// ```

// #### Explanation:
// Because `nums[0] + nums[1] == 9`, we return `[0, 1]`.

// ---

// ### **Constraints**
// 1. `2 <= nums.length <= 10^4`
// 2. `-10^9 <= nums[i] <= 10^9`
// 3. `-10^9 <= target <= 10^9`
// 4. Exactly one solution exists.

// ---

// ### **Solution Approaches**

// #### 1. Brute Force Approach
// - Compare every possible pair of numbers in the array.
// - If the sum of the pair equals the target, return their indices.

// **Algorithm:**
// 1. Use nested loops to iterate over the array.
// 2. For every element `nums[i]`, check all elements `nums[j]` where `j > i`.
// 3. If `nums[i] + nums[j] == target`, return `[i, j]`.

// **Code Implementation:**
// ```java
// class Main {
//     public static void main(String[] args) {
//         int[] nums = {2, 7, 11, 15};
//         int target = 9;
//         int[] ans = addTwoSum(nums, target);
//         System.out.println("[" + ans[0] + ", " + ans[1] + "]");
//     }

//     public static int[] addTwoSum(int[] nums, int target) {
//         for (int i = 0; i < nums.length; i++) {
//             for (int j = i + 1; j < nums.length; j++) {
//                 if (nums[i] + nums[j] == target) {
//                     return new int[]{i, j};
//                 }
//             }
//         }
//         throw new IllegalArgumentException("No solution found");
//     }
// }
// ```

// **Complexity Analysis:**
// - Time Complexity: **O(n^2)** (nested loops iterate over the array).
// - Space Complexity: **O(1)** (no extra space used).

// ---

// #### 2. Optimized Approach (Using HashMap)
// - Use a `HashMap` to store numbers and their indices for quick lookup.
// - As you iterate over the array, calculate the complement (`target - nums[i]`) and check if it exists in the map.

// **Algorithm:**
// 1. Create a `HashMap` to store the numbers and their indices.
// 2. Iterate through the array:
//    - Compute `complement = target - nums[i]`.
//    - If the `complement` is found in the map, return its index and the current index.
//    - Otherwise, add the current number and its index to the map.

// **Code Implementation:**
// ```java
// import java.util.HashMap;

// class Main {
//     public static void main(String[] args) {
//         int[] nums = {2, 7, 11, 15};
//         int target = 9;
//         int[] ans = addTwoSum(nums, target);
//         System.out.println("[" + ans[0] + ", " + ans[1] + "]");
//     }

//     public static int[] addTwoSum(int[] nums, int target) {
//         HashMap<Integer, Integer> map = new HashMap<>();
//         for (int i = 0; i < nums.length; i++) {
//             int complement = target - nums[i];
//             if (map.containsKey(complement)) {
//                 return new int[]{map.get(complement), i};
//             }
//             map.put(nums[i], i);
//         }
//         throw new IllegalArgumentException("No solution found");
//     }
// }
// ```

// **Complexity Analysis:**
// - Time Complexity: **O(n)** (single iteration through the array with constant-time lookups in the map).
// - Space Complexity: **O(n)** (to store elements in the map).

// ---

// ### **Key Differences Between Approaches**
// | Aspect                 | Brute Force            | HashMap Approach       |
// |------------------------|------------------------|------------------------|
// | **Time Complexity**    | O(n^2)                 | O(n)                   |
// | **Space Complexity**   | O(1)                   | O(n)                   |
// | **Efficiency**         | Inefficient for large inputs | Efficient for large inputs |

// ---

// ### **Best Practices**
// 1. Use the HashMap approach for large inputs due to its linear time complexity.
// 2. Always validate edge cases, such as:
//    - Minimum/maximum array size.
//    - Negative numbers.
// 3. Ensure your solution handles the constraints and guarantees of the problem.

