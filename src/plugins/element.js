import Vue from "vue";
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
Vue.component(CollapseTransition.name, CollapseTransition);

import {
  Button,
  Container,
  Aside,
  Menu,
  Submenu,
  Header,
  Table,
  Main,
  Dropdown,
  MenuItem,
  MenuItemGroup,
  DropdownMenu,
  DropdownItem,
  TableColumn,
  Card,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  FormItem,
  Form,
  Select,
  Divider,
  Switch,
  Pagination,
  Option,
  Cascader,
  Dialog,
  Steps,
  Step,
  Checkbox,
  Tabs,
  TabPane,
  DatePicker,
  Link,
  CheckboxGroup,
  Upload,
  Message,
  Avatar,
  Image,
  Badge,
  Collapse,
  CollapseItem,
  
} from "element-ui";

Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Header);
Vue.use(Table);
Vue.use(Main);
Vue.use(Dropdown);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(TableColumn);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Form);

Vue.use(Select);

Vue.use(Divider);
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(Dialog);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Checkbox);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(DatePicker);
Vue.use(Link);
Vue.use(CheckboxGroup);
Vue.use(Upload);
Vue.use(Avatar);
Vue.use(Image);
Vue.use(Badge);
Vue.use(Collapse);
Vue.use(CollapseItem);


Vue.prototype.$message = Message;