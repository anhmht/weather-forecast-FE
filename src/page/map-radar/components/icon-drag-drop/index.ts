import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import IconViewModel from './IconViewModel';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class IconDragDropComponent extends IconViewModel {
    @Prop({ required: true })
    isRecording;

    handleRemoveIcon(id) {
        // debugger
        const index = this.listIcon.findIndex(x => x.name === id);
        // let icon = document.getElementById(id);
        // icon.remove();
        this.listIcon[index].name = null;
    }

    checkDisplayDelete(id) {
        let icon = document.getElementById(id);
        return icon && icon.getAttribute("style") ? true : false;
    }

    dragElement(elmnt) {
        const vm = this;
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(
                elmnt.id + "header"
            ).onmousedown = dragMouseDown;
        }
        // elmnt.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            var cln = elmnt.cloneNode(true);
            //@ts-ignore
            cln.removeAttribute("style");
            cln.id = `${elmnt.className.split("-")[0]}-${checkHighestNumber(
                elmnt
            ) + 1}`;
            if (checkPositionLastIcon(elmnt.id) && checkAllowCloneIcon(elmnt)) {
                // document.getElementById("icon-wrapper").appendChild(cln);
                vm.listIcon.push({
                    name: cln.id,
                    class: elmnt.className,
                    src: vm.listIcon.find(x => x.class === elmnt.className).src
                });
                elmnt.classList.add("is-moved");
                setTimeout(() => {
                    vm.dragElement(document.getElementById(cln.id));
                }, 200);
            }
        }

        function renderId(className) {
            const iconArrays = document.getElementsByClassName(className);
            return iconArrays.length;
        }

        function checkPositionLastIcon(id) {
            let icon = document.getElementById(id);
            return icon && icon.getAttribute("style") ? true : false;
        }

        function checkAllowCloneIcon(elmnt) {
            if (!elmnt.id.includes("-")) {
                return renderId(elmnt.className) < 2;
            }
            const id = `${elmnt.className}-${checkHighestNumber(elmnt)}`;
            if (elmnt.id === id) {
                return true;
            } else return false;
        }

        function checkHighestNumber(elmnt) {
            const iconArrays = document.getElementsByClassName(elmnt.className);
            const temp = [];
            for (let index = 0; index < iconArrays.length; index++) {
                const element = iconArrays[index];
                const number = Number(element.id.split("-")[1]);
                if (number) temp.push(number);
            }
            //@ts-ignore
            return temp.length ? Math.max(...temp) : 0;
        }
    }

    mounted() {
        this.listIcon.forEach(element => {
            this.dragElement(document.getElementById(element.name));
        });
    }
}
