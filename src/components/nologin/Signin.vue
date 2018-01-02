<style scoped>
#signin{
    margin: 40px 10px;
}
.ivu-form-item {
    margin-bottom: 20px;
}
.ivu-btn-ghost {
    color: white;
    background-color: #59b623;
    border-color: #dddee1;
    font-weight: bold;
}
@media only screen and (max-width: 500px) {
    .sign-form .ivu-col-span-5{
        width: 50%;
    }
}
</style>

<template>
    <div id="signin">
        <Form :model="formdata" :label-width="100">
            <Form-item ref="phone" label="手机号码" prop="phone">
                <Row>
                    <Col span="17">
                        <Input v-model="formdata.phone">
                            <span slot="prepend">+86</span>
                        </Input>
                    </Col>
                </Row>
            </Form-item>
            <Form-item ref="password" label="密码" prop="password">
                <Row>
                    <Col span="17">
                        <Input type="password" v-model="formdata.password"/>
                    </Col>
                    <Col span="5" offset="1">
                        <a @click="showModal = true">忘记密码？</a>
                    </Col>
                </Row>
            </Form-item>
            <Form-item>
                <Row>
                    <Col span="17">
                        <Button type="ghost" size="large" long  @click="signin()">登录</Button>
                    </Col>
                </Row>
            </Form-item>
            <!--<Form-item>-->
                <!--<Button type="ghost" size="large" long  @click="weixin()">微信登录</Button>-->
            <!--</Form-item>-->
        </Form>
        <Modal v-model="showModal" title="重置密码" @on-ok="ok" :loading="true">
            <Form ref="resetPwd" :model="resetPwd" :label-width="100" style="margin: 0 30px">
                <Form-item ref="mobile" label="手机号码" prop="phone">
                    <Row>
                        <Col span="20">
                            <Input v-model="resetPwd.phone"/>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item ref="captcha" label="短信验证码" prop="captcha">
                    <Row>
                        <Col span="14">
                            <Input v-model="resetPwd.captcha"/>
                        </Col>
                        <Col span="5" offset="1">
                            <Button type="ghost" shape="circle" :loading="waiting" @click="captcha()">
                                <span v-if="!waiting">获 &nbsp; 取</span>
                                <span v-else>{{countdown}}</span>
                            </Button>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item ref="newPassword" label="新密码" prop="password">
                    <Row>
                        <Col span="20">
                            <Input type="password" v-model="resetPwd.password"/>
                        </Col>
                    </Row>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'signin',
    data: function (){
        return {
            showModal: false,
            formdata: {
                phone: '',
                password: ''
            },
            resetPwd: {
                phone: '',
                captcha: '',
                password: ''
            },
            mobile: /^1[3|4|5|7|8][0-9]{9}$/,
            waiting: false,
            countdown: 0
        };
    },
    watch: {
        showModal(show){
            if(show==false){
                this.$refs.resetPwd.resetFields();
            }
        }
    },
    methods: {
        async captcha () {
            if(this.mobile.test(this.resetPwd.phone)){
                const result = await this.$store.dispatch('captcha', this.resetPwd.phone);
                if(result.code!=200){
                    this.$refs.mobile.validateState = 'error';
                    this.$refs.mobile.validateMessage = '获取验证码失败:${result.info}';
                    setTimeout(()=>{
                        this.$refs.mobile.validateState = '';
                        this.$refs.mobile.validateMessage = '';
                    }, 2000);
                }else{
                    this.countdown = 60;
                    this.waiting = true;
                    var timer = setInterval(() => {
                        if(this.countdown==0){
                            this.waiting=false;
                            clearInterval(timer);
                        }else{
                            this.countdown--;
                        }
                    }, 1000);
                }
            }else{
                this.$refs.mobile.validateState = 'error';
                this.$refs.mobile.validateMessage = '请填写正确的手机号码';
                setTimeout(()=>{
                    this.$refs.mobile.validateState = '';
                    this.$refs.mobile.validateMessage = '';
                }, 2000);
            }
        },
        async ok () {
            const result = await this.$store.dispatch('resetPwd', this.resetPwd);
            if(result.code==200){
                this.showModal = false;
                this.$Message.success("重置密码成功");
            }else{
                switch (result.info){
                    case 'Captcha error':
                        this.$refs.captcha.validateState = 'error';
                        this.$refs.captcha.validateMessage = '验证码不正确';
                        setTimeout(()=>{
                            this.$refs.captcha.validateState = '';
                            this.$refs.captcha.validateMessage = '';
                        }, 2000);
                        break;
                    case 'user not found':
                        this.$refs.mobile.validateState = 'error';
                        this.$refs.mobile.validateMessage = '手机号码未注册';
                        setTimeout(()=>{
                            this.$refs.mobile.validateState = '';
                            this.$refs.mobile.validateMessage = '';
                        }, 2000);
                        break;
                    default:
                        this.showModal = false;
                        this.$Message.error('重置密码失败');
                }
            }
        },
        async signin () {
            const result = await this.$store.dispatch('signin', this.formdata);
            if(result.code!=200){
                switch (result.info){
                    case 'password not correct':
                        this.$refs.password.validateState = 'error';
                        this.$Message.error({
                            content:'密码不正确',
                            duration: 2,
                            onClose: () => {
                                this.$refs.password.validateState = '';
                            }
                        });
                        break;
                    case 'user not found':
                        this.$refs.phone.validateState = 'error';
                        this.$Message.error({
                            content:'手机号码未注册',
                            duration: 2,
                            onClose: () => {
                                this.$refs.phone.validateState = '';
                            }
                        });
                        break;
                    default:
                        this.$Message.error('登录失败，请检查登录信息是否填写正确');
                }
            }else{
                this.$store.dispatch('listCharacters');
                this.$store.dispatch('fetchPolicy');
                this.$router.push('picture');
            }
        }
//        weixin () {
//            this.$store.dispatch('weixin');
//        }
    },
    created(){
        this.$Message.config({ top: 320 });
    }
};
</script>