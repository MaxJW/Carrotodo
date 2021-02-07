export const padWithZeroes = (number) => number.toString().padStart(2, "0"); //Pad number with zeroes (i.e. for timer and time)

//Event when clicking outside of a specific element (e.g. New todo element, click outside will cancel ToDo)
export function clickOutside(node) {
    const handleClick = event => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            )
        }
    }
    document.addEventListener('click', handleClick, true);
    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}