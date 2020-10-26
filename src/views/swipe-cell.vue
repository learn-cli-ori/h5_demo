<template>
    <div class="back-color-active" style="height:100vh">
        <div class="relative" style="overflow:hidden">
            <div
                :style="
                    `transform: translate3d(${allMoveDistance}px, 0, 0);transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1); transition-duration: 0.6s;transition-property: transform;`
                "
            >
                <div
                    class="pd-10 back-color-white"
                    @touchstart="touchstart"
                    @touchmove="touchmove"
                    @touchend="touchend"
                >
                    测试
                </div>
                <div ref="rightSlide" class="right_slide">
                    <div
                        style="height:100%;background-color:red;color:#fff;padding:0 30px"
                    >
                        删除
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            startScreenX: 0, // 记录开始位置
            moveDistance: 0, //实时记录移动的值
            movedDistance: 0, //记录已经移动的值
            allMoveDistance: 0, //总移动值
            maxDistance: 0, //最大滑动距离
            limit: 20, //最低限制
        };
    },
    mounted() {
        this.maxDistance = this.$refs.rightSlide.clientWidth;
    },

    methods: {
        touchstart(event) {
            this.startScreenX = event.touches[0].screenX;
            this.movedDistance = this.allMoveDistance;
        },

        touchmove(event) {
            this.moveDistance = event.touches[0].screenX;
            let moveDistance =
                this.movedDistance + this.moveDistance - this.startScreenX;

            if (moveDistance > 0) {
                moveDistance = 0;
            } else {
                if (Math.abs(moveDistance) > this.maxDistance) {
                    moveDistance = -this.maxDistance;
                }
            }
            this.allMoveDistance = moveDistance;
        },

        touchend(event) {
            if (this.moveDistance == 0) {
                //没有移动
                this.allMoveDistance = 0;
                return;
            }
            let finaMoveDistance = this.moveDistance - this.startScreenX; //大于0 右滑， 小于0左滑
            if (Math.abs(finaMoveDistance) > this.limit) {
                // 是否大于最低限制
                this.allMoveDistance =
                    finaMoveDistance > 0 ? 0 : -this.maxDistance;
            } else {
                this.allMoveDistance =
                    finaMoveDistance > 0 ? -this.maxDistance : 0;
            }
            this.moveDistance = 0;
        },
    },
};
</script>
<style lang="scss" scoped>
.right_slide {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    transform: translate3d(100%, 0, 0);
}
</style>
