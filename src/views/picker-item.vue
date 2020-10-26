<template>
    <section>
        <div
            class="flex width text-center relative color-black picker-item-container-ig"
        >
            <div
                class="flex-1"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd"
            >
                <ul ref="pickerItemRoller" class="picker-item-roller-ig">
                    <li
                        v-for="(item, index) in list"
                        :key="index"
                        class="fz-15"
                    >
                        {{ item[columnValue] }}
                    </li>
                </ul>
            </div>
            <div class="picker-item-zoom-ig"></div>
            <div class="picker-item-mask"></div>
        </div>
    </section>
</template>
<script>
export default {
    name: "pickerItem",
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        columnKey: {
            type: String,
            default: "key",
        },
        columnValue: {
            type: String,
            default: "value",
        },
    },
    data() {
        return {
            // 高度
            lineSpacing: 40,
            moveDistance: 0, //滚动距离
            startTouch: 0,
        };
    },

    methods: {
        touchStart(e) {
            e.preventDefault();
            this.startTouch = this.moveDistance + e.targetTouches[0].pageY;
        },

        touchMove(e) {
            e.preventDefault();
            let move = e.targetTouches[0].pageY;
            this.setTransform(this.startTouch - move); // 大于0 上拉  小于0 下滑
        },

        touchEnd(e) {
            e.preventDefault();
            // 大于0 上拉  小于0 下滑
            let updateMove =
                Math.round(this.moveDistance / this.lineSpacing) *
                this.lineSpacing;
            this.setTransform(updateMove, "end");
            this.getIndex();
        },

        getIndex() {
            let index = this.moveDistance / this.lineSpacing + 2;
        },

        setTransform(distance, type) {
            let max = this.lineSpacing * this.list.length, //80
                min = -this.lineSpacing; //120
            if (type == "end") {
                if (distance < 0) {
                    //下滑
                    distance = 0;
                } else if (distance >= this.list.length * 40) {
                    distance = (this.list.length - 1) * 40; //40
                }
                this.$refs.pickerItemRoller.style.transition =
                    "transform 1000ms cubic-bezier(0.19, 1, 0.22, 1)";
            } else {
                if (distance < min) {
                    distance = min;
                } else if (distance > max) {
                    distance = max;
                }
                this.$refs.pickerItemRoller.style.transition = "";
            }

            this.$refs.pickerItemRoller.style.transform =
                "translate3d(0, " + -distance + "px, 0)";
            this.moveDistance = distance;
        },
    },
};
</script>

<style lang="scss" scoped>
.f-10 {
    font-size: 10px;
    animation-delay: 400ms;
}
li {
    color: #333;
    height: 40px;
    line-height: 40px;
}
.picker-item-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0.9),
            hsla(0, 0%, 100%, 0.4)
        ),
        linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
    background-position: top, bottom;
    background-size: 100% 80px;
    background-repeat: no-repeat;
    z-index: 3;
    pointer-events: none;
}

.picker-item-zoom-ig {
    position: absolute;
    top: 50%;
    width: 100%;
    right: 16px;
    height: 40px;
    left: 0;
    z-index: 3;
    transform: translateY(-50%);
    pointer-events: none;
    &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        background-color: #ccc;
        height: 1px;
    }
    &::after {
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #ccc;
        height: 1px;
    }
}

.picker-item-roller-ig {
    position: absolute;
    width: 100%;
    transform: translate3d(0, 0, 0);
    top: 80px;
    > li {
        height: 40px;
    }
}

.picker-item-container-ig {
    height: 200px;
    overflow: hidden;
}
</style>
