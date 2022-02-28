<template>
    <div style='height: 400px;overflow:hidden;overflow-y:scroll;'>
        <el-timeline v-if="rectificationRecord.length > 0">
            <el-timeline-item v-for="item in rectificationRecord" :key="item.id" :timestamp=item.createTime placement="top">
                <el-card>
                    <p>发起人: {{item.initiator}} </p>
                    <p>接收人: {{item.receiver}}</p>
                    <p>状态: {{item.statusName}}</p>
                    <p>备注: {{item.instructions}}</p>
                    <p v-if="item.tattachmentVoList && item.tattachmentVoList.length">图片: </p>
                    <el-row justify="space-between">
                        <el-col v-for="imgs in item.tattachmentVoList" :key='imgs.id' :span=8>
                            <el-image 
                                fit="contain"
                                style="width: 100%; height: 150px"
                                :src="imgs.thumbnailUrl" 
                                :preview-src-list=[imgs.locationUrl]>
                            </el-image>
                        </el-col>
                    </el-row>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <el-empty class='empty-style' v-if="rectificationRecord.length == 0" :image-size="200" description="暂无整改办理记录"></el-empty>
    </div>
</template>
<script>
    export default {
        name: 'rectificationRecord',
        data() {
            return {
                rectificationRecord: []
            }
        },
        props: {
            currentData: Object
        },
        watch: {
            currentData() {
                this.getRectificationInfo()
            }
        },
        created() {
            this.getRectificationInfo()
        },
        methods: {
            getRectificationInfo() {
                this.$axios.get(`/api/regulatory/case/getCaseRoam/${this.currentData.id}`)
                .then((res) => {
                    this.rectificationRecord = res.data.map((item) => {
                        if (item.tattachmentVoList) {
                            item.tattachmentVoList = item.tattachmentVoList.map((ele) => {
                                ele.thumbnailUrl = this.IMG_URL + ele.thumbnailUrl
                                ele.locationUrl = this.IMG_URL + ele.locationUrl
                                return ele
                            })
                        }
                        return item
                    })
                })
                .catch((error) => {
                    this.$message.error("请稍等后重试!");
                });
            }
        }
    }
</script>

<style>
    .empty-style {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
