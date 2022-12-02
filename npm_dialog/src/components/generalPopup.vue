<template>
  <div class="tip">
    <el-dialog
      :visible.sync="visible"
      :width="width"
      :before-close="handleClose"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="title" slot="title">
        <i :class="icon"></i>
        <span>{{ title }}</span>
      </div>
      <span>{{ message }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button :type="cancelButtonType" v-if="showButton" @click="cancel">{{
          cancelButtonText
        }}</el-button>
        <el-button :type="confirmButtonType" @click="confirm">{{
          confirmButtonText
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "tip",
  props: {
    icon: {
      default: "warningIcon",
      type: String
    },
    title: {
      default: "提示",
      type: String
    },
    message: {
      default: "",
      type: String
    },
    confirmButtonText: {
      default: "确定",
      type: String
    },
    cancelButtonText: {
      default: "取消",
      type: String
    },
    confirmButtonType: {
      default: "primary",
      type: String
    },
    cancelButtonType: {
      default: "default",
      type: String
    },
    beforeClose: {
      default: null,
      type: Function
    },
    width: {
      default: "400px",
      type: String
    },
    showButton: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    confirm() {
      this.beforeClose && this.beforeClose("confirm", this.close);
    },
    cancel() {
      this.beforeClose && this.beforeClose("cancel", this.close);
    },
    close() {
      this.visible = false;
    },
    handleClose(done) {
      if (this.beforeClose) {
        this.beforeClose("beforeClose", done);
      } else {
        done();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.title {
  display: flex;
  align-items: center;
  text-align: left;
  .warningIcon {
    display: block;
    background: url("../assets/Image/warningIcon.png") no-repeat
      center;
    width: 24px;
    height: 24px;
  }
  .deleteIcon {
    display: block;
    background: url("../assets/Image/deleteIcon.png") no-repeat
      center;
    width: 24px;
    height: 24px;
  }
  span {
    margin: 0 0 0 12px;
    color: #424242;
    font-size: 18px;
  }
}
::v-deep .el-dialog__header {
  padding: 30px 30px 0px 30px;
}
::v-deep .el-dialog__body {
  text-align: left;
  padding: 21px 30px 30px 66px;
}
::v-deep .el-dialog__footer {
  padding-top: 0;
  padding: 0 30px 30px 30px;
  .dialog-footer button {
    min-width: 68px;
    height: 32px;
    padding: 0 10px;
  }
}
</style>
