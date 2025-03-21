class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr);
    }

    insert(value,node = this.root) {
        if (node = null) return new Node(value);

        if (node.data == value) return node;

        if (node.data > value) {
            node.left = this.insert(value,node.left);
        }else {
            node.right = this.insert(value,node.right);
        }

        return node;
    }

    delete(value,node = this.root) {
        if (node == null) return node;

        if (node.data > value) {
            node.left = this.delete(value,node.left);
        } else if (node.data < value) {
            node.right = this.delete(value,node.right);
        } else {

            if (node.left == null) {
                return node.right;
            }
            if (node.right == null) {
                return node.left;
            }

            let successor = getSuccessor(node);
            node.data = successor.data;
            node.right = this.delete(successor.data,node.right);
        }
        return node;

    }

    find(value, node = this.root) {
        if (node == null) return;

        if (node.data > value) {
            return this.find(value,node.left);
        }
        if( node.data < value) {
            return this.find(value,node.right);
        } 
        return node;
    }

    levelOrder(cb) {
        let q = [this.root];
        let levelOrderList = [];
        while (q.length) {
            let node = q[0];

            cb? cb(node) : levelOrderList.push(node.data);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
            q.shift();
        }
        return levelOrderList;
    }

    inOrder(cb, node = this.root, arr = []) {
        if (node == null) return;
        this.inOrder(cb,node.left, arr);
        cb? cb(node) : arr.push(node.data)
        this.inOrder(cb,node.right, arr);
        return arr
    }

    preOrder(cb, node = this.root, arr = []) {
        if (node == null) return;
        cb? cb(node) : arr.push(node.data)
        this.preOrder(cb,node.left, arr);
        this.preOrder(cb,node.right, arr);
        return arr
    }

    postOrder(cb, node = this.root, arr = []) {
        if (node == null) return;
        this.postOrder(cb,node.left, arr);
        this.postOrder(cb,node.right, arr);
        cb? cb(node) : arr.push(node.data)
        return arr
    }

    height(node) {
        if (!node) return -1;
        return Math.max(this.height(node.left),this.height(node.right)) + 1
    }

    depth(value,currentNode = this.root) {
        if (currentNode === null) return -1;

        let distance = -1;

        if (currentNode.data === value ||
            (distance = this.depth(value,currentNode.left)) >= 0 ||
            (distance = this.depth(value,currentNode.right)) >= 0 ){
                return distance + 1;
            }

        return distance;
    }

    isBalanced(node = this.root) {
        //returns bool
       if (node === null) return true;

       let diff = Math.abs(this.height(node.left) - this.height(node.right));
       if (diff > 1) return false;

       return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance(tree) {
        let arr = this.inOrder();
        this.root = buildTree(arr);
    }

    print() {
        prettyPrint(this.root);
    }
}

function buildTree(array) {
    let sorted = sortArray(array);
    return balancedBST(sorted,0,sorted.length-1);
}

function balancedBST(arr,start,end) {
    if (start > end) return null;

    let mid = Math.floor((start+end)/2);

    let root = new Node(arr[mid]);

    root.left = balancedBST(arr,start,mid-1);
    root.right = balancedBST(arr,mid+1,end);

    return root;
}

function sortArray(array) {
    return [...new Set(array)].sort((a,b) => a-b);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function getSuccessor(node) {
    let successor = node.right;
    while (successor !== null && successor.left !== null) {
        successor = successor.left;
    }
    return successor;
}


let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.print();

console.log(tree.isBalanced());