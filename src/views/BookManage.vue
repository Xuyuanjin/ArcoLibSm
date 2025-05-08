
<template>
  <div class="bigbox">
    <a-layout class="layout-demo">
      <!--侧边栏-->
      <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
        <div class="logo"/>
        <!--封装左侧菜单组件-->
        <LeftMeun></LeftMeun>
      </a-layout-sider>

      <a-layout>
        <!--头部-->
        <a-layout-header style="padding-left: 20px;">
          <!--折叠菜单按钮-->
          <a-button shape="round" @click="onCollapse">
            <IconCaretRight v-if="collapsed"/>
            <IconCaretLeft v-else/>
          </a-button>

          <!--头像组件-->
          <AvatarTop></AvatarTop>

        </a-layout-header>

        <a-layout style="padding: 0 24px;">
          <!--面包屑-->
          <a-breadcrumb :style="{ margin: '16px 0' }">
            <a-breadcrumb-item>书籍管理</a-breadcrumb-item>
          </a-breadcrumb>
          <!--搜索与功能-->
          <div style="margin-bottom: 20px; display: flex; justify-content: start">
            <div>
              <a-input
                  v-model="input"
                  :style="{ width: '320px' }"
                  style="background-color: #e6ecdf"
                  placeholder="请输入书籍ISBN"
                  allow-clear
              />
              <a-button @click="getByISBN" type="primary" status="success" style="margin-left: 3px;">搜索</a-button>
            </div>
            <div style="margin-left: 20px">
              <a-button type="primary" status="warning" @click="showAddBookModal">新增书籍</a-button>
              <a-button type="primary" style="margin-left: 10px;" @click="getAllBooks">查询全部书籍信息</a-button>
            </div>
          </div>
          <!--内容-->
          <a-layout-content>
            <a-table :columns="columns" :data="Listdata" :pagination="pagination">
              <template #optional="{ record }">
                <a-button @click="showEditBookModal(record)" status="warning">编辑</a-button>
                <a-button status="danger" style="margin-left: 10px;" @click="getDeleteBook(record.bisbn)">删除</a-button>
              </template>
            </a-table>
          </a-layout-content>
          <!--底部-->
          <a-layout-footer>
            Copyright © 2024 至上松一
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>

    <!-- 新增书籍弹框 -->
    <a-modal v-model:visible="addBookModalVisible" title="新增书籍" @cancel="handleCancelAddBook" @ok="handleSubmitAddBook">
      <a-form :model="addBookForm" ref="addBookFormRef">
        <a-form-item field="bisbn" label="ISBN">
          <a-input v-model="addBookForm.bisbn" allow-clear/>
        </a-form-item>
        <a-form-item field="bname" label="书名">
          <a-input v-model="addBookForm.bname" allow-clear/>
        </a-form-item>
        <a-form-item field="bpress" label="出版社">
          <a-input v-model="addBookForm.bpress" allow-clear/>
        </a-form-item>
        <a-form-item field="bauthor" label="作者">
          <a-input v-model="addBookForm.bauthor" allow-clear/>
        </a-form-item>
        <a-form-item field="bprice" label="价格">
          <a-input v-model="addBookForm.bprice" allow-clear/>
        </a-form-item>
        <a-form-item field="bnum" label="数量">
          <a-input v-model="addBookForm.bnum" allow-clear/>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 编辑书籍弹框 -->
    <a-modal v-model:visible="editBookModalVisible" title="编辑书籍" @cancel="handleCancelEditBook" @ok="handleSubmitEditBook">
      <a-form :model="editBookForm" ref="editBookFormRef">
        <a-form-item field="bisbn" label="ISBN">
          <a-input v-model="editBookForm.bisbn" allow-clear disabled/>
        </a-form-item>
        <a-form-item field="bname" label="书名">
          <a-input v-model="editBookForm.bname" allow-clear/>
        </a-form-item>
        <a-form-item field="bpress" label="出版社">
          <a-input v-model="editBookForm.bpress" allow-clear/>
        </a-form-item>
        <a-form-item field="bauthor" label="作者">
          <a-input v-model="editBookForm.bauthor" allow-clear/>
        </a-form-item>
        <a-form-item field="bprice" label="价格">
          <a-input v-model="editBookForm.bprice" allow-clear/>
        </a-form-item>
        <a-form-item field="bnum" label="数量">
          <a-input v-model="editBookForm.bnum" allow-clear/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import {bUrl} from "@/api/BaseUrl"; // 引入基础url函数
import {LoadBooks} from "@/api/BookRequest";
import {defineComponent, ref} from 'vue';
import {Message} from '@arco-design/web-vue';
import {IconCaretRight, IconCaretLeft} from '@arco-design/web-vue/es/icon';
import AvatarTop from "@/components/AvatarTop.vue";
import LeftMeun from "@/components/LeftMeun.vue";

export default defineComponent({
  name: "books",
  // 注册组件
  components: {
    AvatarTop,
    LeftMeun,
    IconCaretRight,
    IconCaretLeft,
  },
  // 数据
  data() {
    return {
      Listdata: [],
      input: "",
      addBookModalVisible: false,
      editBookModalVisible: false,
      addBookForm: {
        bisbn: '',
        bname: '',
        bpress: '',
        bauthor: '',
        bprice: '',
        bnum: ''
      },
      editBookForm: {
        bisbn: '',
        bname: '',
        bpress: '',
        bauthor: '',
        bprice: '',
        bnum: ''
      },
      visibility: true,

      columns: [
        {
          title: 'ISBN',
          dataIndex: 'bisbn'
        },
        {
          title: '书名',
          dataIndex: 'bname'
        },
        {
          title: '出版社',
          dataIndex: 'bpress'
        },
        {
          title: '作者',
          dataIndex: 'bauthor'
        },
        {
          title: '价格',
          dataIndex: 'bprice'
        },
        {
          title: '数量',
          dataIndex: 'bnum'
        },
        {
          title: '操作',
          slotName: 'optional'
        }
      ],
      pagination: {
        showTotal: true,
        showJumper: true,
        sizeCanChange: true,
        pageSize: 8,
        pageSizeChange: (pageSize) => {
          this.pagination.pageSize = pageSize;
          this.getLoad();
        },
        currentChange: (current) => {
          this.pagination.currentPage = current;
          this.getLoad();
        }
      },
      collapsed: false
    };
  },
  methods: {
    // 切换侧边栏折叠状态
    onCollapse() {
      this.collapsed = !this.collapsed;
    },
    // 加载书籍信息
    getLoad() {
      LoadBooks().then(res => {
        console.log(res)
        this.Listdata = res.data.data;
      }).catch(err => {
        console.log("响应失败");
      });
    },
    // 根据ISBN查询书籍信息
    getByISBN() {
      axios(bUrl() + "/book/" + this.input).then(res => {
        this.Listdata = res.data.data;
      }).catch(err => {
        alert("请规范输入书籍ISBN");
      });
    },
    // 查询全部书籍信息
    getAllBooks() {
      this.getLoad();
    },
    // 删除书籍
    getDeleteBook(bisbn) {
      axios.delete(bUrl() + "/book/" + bisbn).then(res => {
        this.getLoad(); // 重新加载书籍列表
        Message.success({content: '书籍删除成功', showIcon: true});
      }).catch(err => {
        console.log("删除失败");
      });
    },

    // 显示新增弹框
    showAddBookModal() {
      this.resetForm('add');
      this.addBookModalVisible = true;
    },
    // 关闭新增弹框
    handleCancelAddBook() {
      this.addBookModalVisible = false;
    },
    // 提交新增信息
    handleSubmitAddBook() {
      this.$refs.addBookFormRef.validate().then(() => {
        this.addBook();
      }).catch(() => {
        Message.error({content: '请检查输入内容', showIcon: true});
      });
    },
    // 新增书籍
    addBook() {
      axios.post(bUrl() + "/book", this.addBookForm).then(res => {
        this.getLoad(); // 重新加载列表
        Message.success({content: '书籍新增成功', showIcon: true});
        this.handleCancelAddBook(); // 关闭弹框
      }).catch(err => {
        Message.error({content: '书籍新增失败', showIcon: false});
      });
    },
    // 显示编辑弹框
    showEditBookModal(record) {
      this.editBookForm = {...record}; // 填充表单
      this.editBookModalVisible = true;
    },
    // 关闭编辑弹框
    handleCancelEditBook() {
      this.editBookModalVisible = false;
    },
    // 提交编辑信息
    handleSubmitEditBook() {
      this.$refs.editBookFormRef.validate().then(() => {
        this.updateBook();
      }).catch(() => {
        Message.error({content: '请检查输入内容', showIcon: true});
      });
    },
    // 更新信息
    updateBook() {
      axios.put(bUrl() + "/book/" + this.editBookForm.bisbn, this.editBookForm).then(res => {
        this.getLoad(); // 重新加载列表
        Message.success({content: '书籍信息更新成功', showIcon: true});
        this.handleCancelEditBook(); // 关闭弹框
      }).catch(err => {
        console.log("更新失败");
      });
    },
    // 重置表单
    resetForm(formType) {
      if (formType === 'add') {
        this.addBookForm = {
          bisbn: '',
          bname: '',
          bpress: '',
          bauthor: '',
          bprice: '',
          bnum: ''
        };
      } else if (formType === 'edit') {
        this.editBookForm = {
          bisbn: '',
          bname: '',
          bpress: '',
          bauthor: '',
          bprice: '',
          bnum: ''
        };
      }

    }
  },
  mounted() {
    this.getLoad(); // 组件挂载后加载书籍列表
  }
});
</script>

<style scoped>
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 40px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  color: rgba(196, 113, 113, 0.7);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>