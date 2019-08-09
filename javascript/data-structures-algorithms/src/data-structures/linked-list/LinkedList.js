import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator';

export default class LinkedList {
  constructor(compareFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(compareFunction);
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   * O(1)
   */
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   * O(1)
   */
  append(value) {
    // 1. no node in list
    // 2. has node in list
    const newNode = new LinkedListNode(value); // newNode: { value, next: null}

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedListNode}
   * O(n)
   */
  delete(value) {
    // 1. no node in list
    // 2. has node in list
    //   2.1 delete head with same value
    //   2.2 delete noraml node with same value
    //   2.3 delete tail node with same value
    if (!this.head) {
      return null;
    }

    let deleteNode = null;
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head;
      this.head = deleteNode.next;
    }

    let currentNode = this.head;
    if (currentNode != null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) { // can't check tail because there is no next
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = deleteNode.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deleteNode;
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   * O(n)
   */
  find({ value = undefined, callback = undefined }) {
    // 1. no node in list
    // 2. has node in list
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * @return {LinkedListNode}
   * O(n)
   */
  deleteTail() {
    // 1. only one node in linked list. ( set head,tail null)
    // 2. more than one node in linked list. ( read from head to tail)
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currendNode = this.head;
    while (currendNode.next) {
      if (!currendNode.next.next) {
        currendNode.next = null;
      } else {
        currendNode = currendNode.next;
      }
    }
    this.tail = currendNode;

    return deletedTail;
  }

  /**
   * @return {LinkedListNode}
   * O(1)
   */
  deleteHead() {
    // 1. only one node in linked list. ( set head,tail null)
    // 2. more than one node in linked list. ( read from head to tail)
    const deletedHead = this.head;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedHead;
    }

    this.head = this.head.next;
    return deletedHead;
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   * O(n)
   */
  fromArray(values) {
    values.forEach(value => this.append(value));
    return this;
  }

  /**
   * @return {LinkedListNode[]}
   * O(n)
   */
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   * O(n)
   */
  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString();
  }

  /**
   * Reverse a linked list.
   * @returns {LinkedList}
   * O(n)
   */
  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      // Store next node.
      nextNode = currentNode.next;

      // Change next node of the current node so it would link to previous node.
      currentNode.next = prevNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currentNode;
      currentNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
