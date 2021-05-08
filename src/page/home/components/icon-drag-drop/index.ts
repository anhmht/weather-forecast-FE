import Component from "vue-class-component";
import Vue from "vue";
import icon from "../../../../assets/img/day_rain_thunder.png";

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class IconDragDropComponent extends Vue {
    listIcon = [
        {
            name:'day_rain_thunder',
            src: icon
        }
    ]
    dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        elmnt.onmousedown = dragMouseDown;
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
            // const checkExistIcon = checkIconElement(elmnt.className);
            // if (checkExistIcon < 2) {

            // }

            //@ts-ignore
                cln.style = "";
                cln.id += `-${checkIconElement(elmnt.className)}`;
                document.getElementById("icon-wrapper").appendChild(cln);
        }

        function checkIconElement(className) {
            const iconArrays = document.getElementsByClassName(className);
            return iconArrays.length
        }
    }

    mounted() {
        this.listIcon.forEach(element => {
            this.dragElement(document.getElementById(element.name));
        });
    }
}
