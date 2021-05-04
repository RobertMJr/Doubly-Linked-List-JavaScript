class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.prev = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	// Push a node to the end of the list
	push(val) {
		const newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length++;
		return this;
	}
	// Remove a node from the end of the list
	pop() {
		if (this.length === 0) return undefined;
		const removed = this.tail;
		if (this.length === 1) {
			this.head = null;
			this.tail = null;
		} else {
			this.tail = this.tail.prev;
			this.tail.next = null;
			removed.prev = null;
		}
		this.length--;
		return removed;
	}
	// Remove a node from the beginning of the list
	shift() {
		if (this.length === 0) return undefined;
		const removed = this.head;
		if (this.length === 1) {
			this.head = null;
			this.tail = null;
		} else {
			this.head = this.head.next;
			this.head.prev = null;
			removed.next = null;
		}
		this.length--;
		return removed;
	}
	// Add a node to the beginning of the list
	unshift(val) {
		const newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		}
		this.length++;
		return this;
	}
	// Access a node in the list by its position
	get(idx) {
		if (idx < 0 || idx >= this.length) return null;
		if (idx <= this.length / 2) {
			let currentNode = this.head;
			for (let i = 0; i < idx; i++) {
				currentNode = currentNode.next;
			}
			return currentNode;
		} else {
			let currentNode = this.tail;
			for (let i = this.length - 1; i > idx; i--) {
				currentNode = currentNode.prev;
			}
			return currentNode;
		}
	}
	// Access a node in the list by its position
	get2(idx) {
		if (idx < 0 || idx >= this.length) return null;
		let current = this.head;
		let direction = 'next';
		// If it starts from the end
		if (idx > (this.length - 1) / 2) {
			current = this.tail;
			direction = 'prev';
			idx = this.length - 1 - idx;
		}
		for (let i = 0; i < idx; i++) current = current[direction];
		return current;
	}
	// Replace the value of a node at the specified index
	set(idx, val) {
		const nodeToUpdate = this.get(idx);
		if (nodeToUpdate) {
			nodeToUpdate.val = val;
			return true;
		}
		return false;
	}
	// Adding a node in the list at a certain position / index
	insert(idx, val) {
		if (idx < 0 || idx > this.length) return false;
		// Coercing the returned result of the push and unshift methods into a boolean by using the double bang "!!"
		if (idx === this.length) return !!this.push(val);
		if (idx === 0) return !!this.unshift(val);

		let newNode = new Node(val);
		let beforeNode = this.get(idx - 1);
		let afterNode = beforeNode.next;

		(beforeNode.next = newNode), (newNode.prev = beforeNode);
		(newNode.next = afterNode), (afterNode.prev = newNode);
		this.length++;
		return true;
	}

	remove(idx) {
		if (idx < 0 || idx >= this.length) return undefined;
		if (idx === 0) return this.shift();
		if (idx === this.length - 1) return this.pop();

		let removedNode = this.get(idx);
		let beforeNode = removedNode.prev;
		let afterNode = removedNode.next;

		beforeNode.next = afterNode;
		afterNode.prev = beforeNode;
		removedNode.next = null;
		removedNode.prev = null;
		this.length--;
		return true;
	}

	print() {
		const arr = [];
		for (let i = 0; i < this.length; i++) {
			arr.push(this.get(i));
		}
		console.log(arr);
	}
	// Reverse all of the nodes in the list and returns the list
	reverse() {
		let node = this.head;
		this.head = this.tail;
		this.tail = node;
		let prev = null;
		let next = null;
		for (let i = 0; i < this.length; i++) {
			next = node.next;
			node.next = prev;
			prev = node;
			node.prev = next;
			node = next;
		}
		return this;
	}
}

const doubly = new DoublyLinkedList();
doubly.push(12);
doubly.push(13);
doubly.push(14);
doubly.unshift(11);
doubly.insert(4, 15);
doubly.print();
console.log(doubly.remove(1));
console.log(doubly.print());
doubly.reverse();
doubly.print();
