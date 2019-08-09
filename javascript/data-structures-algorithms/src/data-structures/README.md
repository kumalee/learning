# 时间复杂度

1. 数组
* Access O(1) 由硬件和寻址算法保证查找元素所需要的操作为一次
* Insert O(n) 需要挪动其他元素的索引位置，所以平均复杂度为 O(n)
* Delete O(n) 需要挪动其他元素的索引位置，所以平均复杂度为 O(n)

2. 链表
* Access O(n) 需要从 head 开始逐个寻找
* Insert O(n) 操作分为两步，查找O(n)和插入O(1)
* Delete O(n) 操作分为两步，查找O(n)和插入O(1)
* Prepends O(1) 只需重置 head，操作一次即可。
* Append O(1)   只需重置 tail, 操作一次即可。
