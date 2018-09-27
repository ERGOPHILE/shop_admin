// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入组件
import { quillEditor } from 'vue-quill-editor'
export default {
    created() {
        //页面已进入就渲染商品分类列表
        this.goodsCat()
    },
    data() {
        return {
            //步骤条的进度
            active: 0,
            // tbs标签默认显示那个
            activeName: 'first',
            //基本信息的添加内容
            goodsAddForm: {
                //商品名称 不能为空
                goods_name: "",
                // 商品价格 不能为空
                goods_price: "",
                // 商品重量 不能为空
                goods_weight: "",
                // 商品数量 不能为空
                goods_number: "",
                // 是否促销
                is_promote: false,
                //商品介绍
                goods_introduce: "",
                //上传的图片临时路径（对象）
                pics: [],
            },
            // 商品分类  以为','分割的分类列表 不能为空
            goods_cat: [],
            // 商品分类渲染
            goodsCatlist: [],
            //第一添加数据校验  pattern:""//正则 trigger 触发方式
            rules: {
                goods_name: [
                    { required: true, message: '商品名称不能为空', trigger: 'blur' }
                ],
                goods_price: [
                    { required: true, message: '商品价格不能为空', trigger: 'blur' },
                    { pattern: /^\d+$/, message: '只能是数字格式', trigger: 'change' }
                ],
                goods_weight: [
                    { required: true, message: '商品重量不能为空', trigger: 'blur' },
                    { pattern: /^\d+$/, message: '只能是数字格式', trigger: 'change' }
                ],
                goods_number: [
                    { required: true, message: '商品数量不能为空', trigger: 'blur' },
                    { pattern: /^\d+$/, message: '只能是数字格式', trigger: 'change' }
                ],
            },
            // 商品的参数（数组）
            attrs: [],
            //了图片路径
            imageUrl: "",
            // 上传图片时用到的header
            uploadHeaders: {
                Authorization: localStorage.getItem('token')
            }
        }
    },
    methods: {
        //实现点击标签页来控制进度条的进度
        handleClick(tab) {
            this.active = +tab.index
        },
        //第一步商品分类数据渲染
        async  goodsCat() {
            const res = await this.$http.get('categories', {
                params: {
                    type: 3
                }
            })
            const { data, meta } = res.data
            if (meta.status === 200) {
                data.forEach(v => {
                    this.goodsCatlist.push(v)
                })
            }
        },
        // 第一步数据基本信息数据
        oneAddData() {
            // console.log(this.$refs.goodsAddFrom);
            console.log(this.goods_cat);

            this.$refs.goodsAddForm.validate((valid) => {
                if (valid) {
                    // 如果数据验证成功
                    this.active = 1
                    this.activeName = "two"
                    // this.$refs.goodsAddFrom.resetFields();
                } else {
                    this.$message({
                        type: "error",
                        message: "请完成上一步操作"
                    })
                    return false;
                }
            });
        },
        //第二步获取图片地址
        handleAvatarSuccess(res, file) {
            if (res.meta.status === 200) {
                this.goodsAddForm.pics.push(res.data.tmp_path)
                this.$message({
                    type: "success",
                    message: res.meta.msg
                })
            } else {
                this.$message({
                    type: "error",
                    message: res.meta.msg
                })
            }
        },
        //规定图片的上传格式和大小
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        twoAddData() {
            if (this.goodsAddForm.pics.length > 0) {
                this.active = 2
                this.activeName = "three"
            }
            else {
                this.$message({
                    type: "error",
                    message: "图片上传失败"
                })
            }
        },
        //第三步
        async  threeAddData() {
            const goodsAddForm = {
                ...this.goodsAddForm,
                // 给 goods_cat 重新设置值，将来生成的数据中， goods_cat 就以这个为准了
                goods_cat: this.goods_cat.join(',')
            }
            const res = await this.$http.post('goods', goodsAddForm)
            console.log(res);

            if (res.data.meta.status === 201) {
                //进度条
                this.active = 3
                this.$message({
                    type: "success",
                    message: res.data.meta.msg
                })
                this.$router.push('/goods')
            } else {
                this.$message({
                    type: "error",
                    message: res.data.meta.msg
                })
            }


        }
    },
    //注册副文本编辑器为局部组件
    components: {
        quillEditor
    }
}