<template>
    <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="案件描述" name='check'>
            <AddDialog :reset="reset" :isEdit='isEdit' :currentData="currentData" @confirmDialog='confirmDialog'></AddDialog>
        </el-tab-pane>
        <el-tab-pane label="整改办理记录" name='消息中心'>
            <RectificationRecord :currentData="currentData"></RectificationRecord>
        </el-tab-pane>
        <el-tab-pane v-if="currentData.button == '1'" label="审核详情" name='audit'>
            <CaseDescription :currentData="currentData" @confirmDialog='confirmDialog'></CaseDescription>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import AddDialog from './addDialog.vue';
    import CaseDescription from './caseDescription.vue';
    import RectificationRecord from './rectificationRecord.vue';
    export default {
        name: 'checkDialog',
        components: {
            AddDialog,
            CaseDescription,
            RectificationRecord
        },
        props: {
            currentData: Object,
            checkOrAudit: String
        },
        watch: {
            checkOrAudit(newVl, oldVl) {
                this.activeName = newVl
            }
        },
        data() {
            return {
                activeName: this.checkOrAudit,
                isEdit: true,
                reset: false
            }
        },
        methods: {
            cancelCase() {
                this.$emit('cancelDialog')
            },
            confirmDialog(formName) {
                this.$emit('cancelDialog')
            }
        }
    }
</script>

<style></style>
