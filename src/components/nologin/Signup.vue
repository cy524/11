<style scoped>
#signup{
    margin: 40px;
}

.ivu-form-item {
    margin-bottom: 20px;
}
.ivu-checkbox-wrapper {
    margin-right: 0;
}
.ivu-btn-ghost {
    color: white;
    background-color: #59b623;
    border-color: #dddee1;
    font-weight: bold;
}
.ivu-icon {
    display: none;
}
.agreement{
    max-height: 400px;
    overflow: auto;
}
.agreement li{
    margin-top: 10px 0;
}
@media only screen and (max-width: 500px) {
    
}
</style>

<template>
    <div id="signup">
        <Form ref="signup" :model="formdata" :label-width="100">
            <Form-item ref="phone" label="手机号码" prop="phone">
                <Row>
                    <Col span="18">
                        <Input v-model="formdata.phone">
                            <span slot="prepend">+86</span>
                        </Input>
                    </Col>
                </Row>
            </Form-item>
            <Form-item ref="captcha" label="短信验证码" prop="captcha">
                <Row>
                    <Col span="11">
                        <Input v-model="formdata.captcha"/>
                    </Col>
                    <Col span="5" offset="1">
                        <Button type="ghost" :loading="waiting" @click="captcha">
                            <span v-if="!waiting">获取验证码</span>
                            <span v-else>{{countdown}}</span>
                        </Button>
                    </Col>
                </Row>
            </Form-item>
            <Form-item label="密码" prop="password" style="margin-bottom: 0;">
                <Row>
                    <Col span="18">
                        <Input type="password" v-model="formdata.password"/>
                    </Col>
                </Row>
            </Form-item>
            <Form-item>
                <Checkbox v-model="sign">同意</Checkbox>
                <a @click="agreement">《妈宝秀产品注册协议》</a>
                <Row>
                    <Col span="18">
                        <Button type="ghost" size="large" long @click="signup">免费注册</Button>
                    </Col>
                </Row>
            </Form-item>
            <!--<Form-item>-->
                <!--<Row>-->
                    <!--<Col span="17">-->
                        <!--<Button type="ghost" size="large" long @click="weixin()">微信注册</Button>-->
                    <!--</Col>-->
                <!--</Row>-->
            <!--</Form-item>-->
        </Form>
        <Modal v-model="showModal" title="妈宝秀产品注册协议" ok-text="同意"
               @on-ok="ok" @on-cancel="cancel" scrollable>
            <ul class="agreement">
                <li>尊敬的用户，欢迎您免费申请成为妈宝秀产品的注册用户，我们致力于打通公司旗下不同商业产品的账号，为您提供一站式服务！您若获得妈宝秀及相关产品账户，可在开通相应产品线的权限后，利用同一组用户名和密码使用产品。 以下为您与妈宝秀及其所属公司北京非常满意科技有限公司（下称本公司）的法律协议条款，请您仔细阅读，您访问、浏览或使用产品及任何服务即表明您已阅读、理解并同意受本条款的约束。公司拥有随时修改或中断服务而不需通知用户的权利，公司行使修改或中断服务的权利不需对用户或任何第三方负责。用户必须在同意本条款的前提下，公司才开始对用户提供服务。</li>
                <li><strong>登录步骤</strong></br>要登录到妈宝秀产品，请按以下步骤操作：</br>1. 在用户名字段中，输入您的妈宝秀产品用户名。</br>2. 在密码字段中，输入您的密码。</br>3. 点击登录。</li>
                <li><strong>注册资料</strong></br>基于公司所提供网络和技术服务的特殊性，您应同意： </br>1. 提供详尽、准确的手机号作为注册信息和资料。 </br>2. 产品在不断更新用户信息时，需要您及时、详尽、准确的及时更新资料。如果您提供的资料包含有不正确的信息，公司保留结束您使用该网络服务资格的权利。<br>3. 用户可授权本公司向第三方透露其注册资料，否则本公司不能公开用户的姓名、住址、出件地址、电子邮箱、帐号。除非:<br>（1）事先获得用户明确授权后，用户要求本公司或授权某人通过电子邮件服务或其他方式透露这些信息。<br>（2）相应的法律、法规要求以及按照有关政府主管部门的要求，需要本公司提供用户的个人资料。<br>（3）为了维护公众以及妈宝秀合法利益。<br>（4）妈宝秀可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与妈宝秀同等的保护用户隐私的责任，则妈宝秀有权将用户的注册资料等提供给该第三方。<br>（5）在不透露单个用户隐私资料的前提下，妈宝秀有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</li>
                <li><strong>账户的安全</strong></br>1.您需对您的妈宝秀产品账号用户名和密码的安全性负责，请勿向任何人透露您的用户名和密码。</br>2. 若您忘记了账户密码，可自行通过您的手机号按照流程更新密码。用户隐私保护本公司非常重视信息的保护，在使用妈宝秀的所有产品和服务前，请您务必仔细阅读并透彻理解本协议内容。一旦您选择使用服务，即表示您认可并接受本公司隐私权保护的条款现有内容及其可能随时更新的内容。您的隐私信息包括您的注册信息、上传照片、记录、分享等相关信息，在您的隐私被侵犯的情况下，您在此授权公司可以主动维权。用户在此授权公司可以向其电子邮箱发送商业信息。</li>
                <li><strong>用户责任</strong></br>1. 您需保证您系符合中华人民共和国法律法规的合法公民。</br>2. 您应保证上传照片以及编写的内容没有知识产权问题，不侵害任何第三方利益。</br>3. 您保证通过妈宝秀发布和链接推广的信息不含有任何违反国家有关法律、法规及中华人民共和国承认或加入的国际条约的内容，包括但不限于危害国家安全、淫秽色情、虚假、侮辱、诽谤、恐吓或骚扰、侵犯他人知识产权、人身权或其他合法权益以及有违社会公序良俗的内容或指向这些内容的链接。否则本公司有权经独立判断取消您的帐号及相关服务。</li>
                <li><strong>内容的所有权</strong></br>妈宝秀平台中的内容包括：文字、软件、声音、图片、录象、图表等，本公司拥有所有内容的版权、商标权和其它财产所有权以及使用权。</li>
                <li><strong>免责声明</strong></br>本公司将尽力提供一切可能的技术和设备维护用户的资料和账户安全，并努力为您提供最好的服务。但对您的下述损失免责:</br>1. 由于非故意或不可抗拒的原因（含系统维护和升级），导致的用户数据损失、服务停止，本公司不承担赔偿及其他连带的法律责任。 </br>2. 并非由于本公司的故意或过失而导致用户未能注册及使用成功。</br>3. 由于您或您的代理人故意或过失导致您遭受照片恶意删除和被盗用的。 </br>4. 由于本公司对服务系统进行系统测试、升级、更新、服务抽样测试，对您产生的任何影响。</br>5. 本公司有权随时删除您账户内含有任何危害国家安全、淫秽色情、虚假、侮辱、诽谤、恐吓或骚扰、侵犯他人版权或人身权或其他合法权益等违法或有违社会公序良俗的内容。其他本协议是您与本公司妈宝秀产品签订的具体服务协议，敬请认真阅读并勾选同意才能注册成功，否则本系统有权拒绝您使用服务。</li>
            </ul>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'signup',
    data: function (){
        return {
            mobile: /^1[3|4|5|7|8][0-9]{9}$/,
            formdata: {
                phone: '',
                captcha: '',
                password: ''
            },
            sign: false,
            showModal: false,
            waiting: false,
            countdown: 0
        };
    },
    methods: {
        async captcha () {
            if(this.mobile.test(this.formdata.phone)){
                const result = await this.$store.dispatch('captcha', this.formdata.phone);
                if(result.code!=200){
                    this.$Message.error(`获取验证码失败:${result.info}`);
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
                this.$refs.phone.validateState = 'error';
                this.$Message.error({
                    content:'请输入正确的手机号码',
                    duration: 2,
                    onClose: () => {
                        this.$refs.phone.validateState = '';
                    }
                });
            }
        },
        async signup () {
            if(this.sign){
                const result = await this.$store.dispatch('signup', this.formdata);
                if(result.code!=200){
                    switch (result.info){
                        case 'Captcha error':
                            this.$refs.captcha.validateState = 'error';
                            this.$Message.error({
                                content:'验证码不正确',
                                duration: 2,
                                onClose: () => {
                                    this.$refs.captcha.validateState = '';
                                }
                            });
                            break;
                        case 'Conflict, user exist':
                            this.$refs.phone.validateState = 'error';
                            this.$Message.error({
                                content:'手机号码已注册',
                                duration: 2,
                                onClose: () => {
                                    this.$refs.phone.validateState = '';
                                }
                            });
                            break;
                        default:
                            this.$Message.error('注册失败，请检查注册信息是否填写正确');
                    }
                }else{
                    this.$store.dispatch('fetchPolicy');
                    this.$router.push('picture');
                }
            }else{
                this.$Message.error('注册失败，请阅读并同意《使用须知》');
            }
        },
        agreement(){
            this.showModal = true;
        },
        ok(){
            this.sign = true;
        },
        cancel(){
            this.sign = false;
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