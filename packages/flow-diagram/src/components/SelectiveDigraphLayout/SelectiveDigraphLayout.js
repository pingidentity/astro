import * as go from 'gojs';

/* istanbul ignore file */
class SelectiveDigraphLayout extends go.LayeredDigraphLayout {
    doLayout(coll) {
        const parts = this.collectParts(coll).filter((p) => {
            return (p instanceof go.Link || this.isConnected(p));
        });

        super.doLayout(parts);
    }

    isConnected(node, checked = []) {
        const currentNode = node;
        if (checked.includes(node)) {
            return false;
        }

        if (node.data.isRoot === true) {
            return true;
        }

        if (node instanceof go.Node) {
            let isConnected = false;
            node.findNodesConnected().each((connectedNode) => {
                const links = connectedNode.linksConnected;
                while (links.next()) {
                    const link = links.value;
                    if (link.data.category === 'io') {
                        return false;
                    }
                }
                if (this.isConnected(connectedNode, [...checked, node])) {
                    currentNode.layerName = '';
                    isConnected = true;
                }
                return true;
            });
            if (node.memberParts) {
                node.memberParts.each((connectedNode) => {
                    if (this.isConnected(connectedNode, [...checked, node])) {
                        isConnected = true;
                    }
                });
            }
            return isConnected;
        }
        return false;
    }
}

export default SelectiveDigraphLayout;
