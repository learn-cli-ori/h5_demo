<template>
    <section>
        <!-- <p class="f-10">测试</p>
        <button @click="test" class="f-10">接口测试</button> -->
        <div
            class="flex width text-center relative color-black"
            style="height:200px;overflow: hidden;"
        >
            <div
                class="flex-1"
                ref="picker-box"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd"
            >
                <ul ref="pickerRoller">
                    <li
                        v-for="(item, index) in list"
                        :key="index"
                        class="fz-15"
                        style="height:40px"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div class="picker-zoom" style="height: 40px;"></div>
            <div class="picker-mask"></div>
        </div>
    </section>
</template>
<script>
import { test, test_post } from "@/api/test";
export default {
    data() {
        return {
            list: ["广州", "北京", "上海", "新疆", "澳门"],
            testData: [],
            msg: "",
            moveDistance: 0,
            // 高度
            lineSpacing: 40,
            scrollTop: 0, //滚动距离
            startTouch: 0,
        };
    },

    methods: {
        async test() {
            let t = await test_post({ sex: this.msg });
            console.log(t);
        },

        touchStart(e) {
            this.startTouch = this.scrollTop + e.targetTouches[0].pageY;
        },

        touchMove(e) {
            let move = e.targetTouches[0].pageY;
            console.log(this.scrollTop);
            this.setTransform(this.startTouch - move); // 大于0 上拉  小于0 下滑
        },

        touchEnd(e) {
            // 大于0 上拉  小于0 下滑
            let updateMove =
                Math.round(this.scrollTop / this.lineSpacing) *
                this.lineSpacing;

            if (
                Math.abs(updateMove) >
                (this.list.length - 3) * this.lineSpacing
            ) {
                let flag = Math.sign(updateMove); // 判断正负数
                updateMove = flag * (this.list.length - 3) * this.lineSpacing;
            }

            this.setTransform(updateMove, "end");
        },

        setTransform(distance, type) {
            let max = this.lineSpacing * 3,
                min = -this.lineSpacing * 3;
            if (distance < min) {
                distance = min;
            } else if (distance > max) {
                distance = max;
            }

            if (type == "end") {
                this.$refs.pickerRoller.style.transition =
                    "transform 1000ms cubic-bezier(0.19, 1, 0.22, 1)";
            } else {
                this.$refs.pickerRoller.style.transition = "";
            }

            this.$refs.pickerRoller.style.transform =
                "translate3d(0, " + -distance + "px, 0)";
            this.scrollTop = distance;
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
.picker-mask {
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

.picker-zoom {
    position: absolute;
    top: 50%;
    right: 16px;
    left: 16px;
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
</style>
