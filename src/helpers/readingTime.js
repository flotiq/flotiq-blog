export const getReadingTime = (content) => {
    let numOfWords = 0;
    content.forEach((block) => {
        if (block.data.caption) {
            numOfWords += block.data.caption.replace('&nbsp;', ' ').split(' ').length;
        }
        if (block.data.code) {
            numOfWords += block.data.code.replace('&nbsp;', ' ').split(' ').length;
        }
        if (block.data.message) {
            numOfWords += block.data.message.replace('&nbsp;', ' ').split(' ').length;
        }
        if (block.data.text) {
            numOfWords += block.data.text.replace('&nbsp;', ' ').split(' ').length;
        }
        if (block.data.title) {
            numOfWords += block.data.title.replace('&nbsp;', ' ').split(' ').length;
        }
        if (block.data.items) {
            block.data.items.forEach((item) => {
                numOfWords += item.content.replace('&nbsp;', ' ').split(' ').length;
                if (item.items) {
                    item.items.forEach((subitem) => {
                        numOfWords += subitem.content.replace('&nbsp;', ' ').split(' ').length;
                        if (subitem.items) {
                            subitem.items.forEach((subsubitem) => {
                                numOfWords += subsubitem.content.replace('&nbsp;', ' ').split(' ').length;
                            });
                        }
                    });
                }
            });
        }
        if (block.data.content) {
            block.data.content.forEach((row) => {
                row.forEach((column) => {
                    numOfWords += column.replace('&nbsp;', ' ').split(' ').length;
                });
            });
        }
    });
    return `${Math.ceil(numOfWords / 200)} min read`;
};
