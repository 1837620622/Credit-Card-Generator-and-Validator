import { useState } from 'react'
import { CreditCard, User, Shield, ExternalLink, Copy, Globe, CheckCircle, Zap, Languages } from 'lucide-react'
import { 
  IDENTITY_COUNTRIES, 
  VALIDATOR_SITES, 
  GENERATOR_SITES,
  openIdentityGenerator,
  openBINChecker,
  openCardValidator,
  openCardGenerator,
  copyToClipboard,
  formatCardForValidation
} from './services/externalAPI'
import { 
  generateFullCard, 
  generateMultipleCards, 
  formatCardOutput,
  generateCardFromBIN,
  getSupportedCardTypes,
  getSupportedCountries as getCardCountries,
  getOutputFormats
} from './utils/cardGenerator'
import { generateIdentity, getSupportedCountries as getIdentityCountries } from './utils/identityGenerator'

// ------------------------------------------------------------
// 多语言配置
// ------------------------------------------------------------
const translations = {
  en: {
    brand: 'CK Card Tools',
    brandSub: 'Virtual Card Generator',
    nav: {
      generator: 'Generator',
      identity: 'Identity',
      validator: 'Validator',
      resources: 'Resources'
    },
    generator: {
      title: 'Card Generator',
      subtitle: 'Generate valid test credit card numbers with Luhn algorithm validation',
      config: 'Configuration',
      customBin: 'Custom BIN',
      customBinPlaceholder: 'Enter 6-8 digits',
      cardType: 'Card Type',
      country: 'Country',
      random: 'Random',
      quantity: 'Quantity',
      format: 'Format',
      generate: 'Generate',
      results: 'Results',
      noCards: 'No cards generated',
      noCardsHint: 'Configure and click Generate',
      copyAll: 'Copy All',
      copied: 'Copied!',
      valid: 'Valid',
      invalid: 'Invalid',
      external: 'Namso-Gen'
    },
    identity: {
      title: 'Identity Generator',
      subtitle: 'Generate realistic fake identities for testing purposes',
      selectCountry: 'Select Country',
      generate: 'Generate Identity',
      result: 'Generated Identity',
      noIdentity: 'No identity generated',
      noIdentityHint: 'Select country and generate',
      personal: 'Personal',
      contact: 'Contact',
      address: 'Address',
      account: 'Account',
      name: 'Name',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      birthday: 'Birthday',
      age: 'Age',
      phone: 'Phone',
      email: 'Email',
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'ZIP',
      username: 'Username',
      password: 'Password',
      external: 'External Services'
    },
    validator: {
      title: 'Validation Services',
      subtitle: 'Check BIN information and validate card details',
      binLookup: 'BIN Lookup',
      cardValidation: 'Card Validation',
      open: 'Open'
    },
    resources: {
      title: 'Resources',
      subtitle: 'Quick access to card tools and services',
      generators: 'Generators',
      validators: 'Validators',
      identityByCountry: 'Identity by Country'
    },
    footer: {
      disclaimer: 'For educational purposes only',
      madeWith: 'Made with'
    }
  },
  zh: {
    brand: 'CK 卡片工具',
    brandSub: '虚拟卡生成器',
    nav: {
      generator: '生成器',
      identity: '身份',
      validator: '验证',
      resources: '资源'
    },
    generator: {
      title: '卡号生成器',
      subtitle: '生成通过Luhn算法验证的测试信用卡号',
      config: '配置选项',
      customBin: '自定义BIN',
      customBinPlaceholder: '输入6-8位数字',
      cardType: '卡片类型',
      country: '国家',
      random: '随机',
      quantity: '数量',
      format: '格式',
      generate: '生成',
      results: '生成结果',
      noCards: '暂无生成的卡号',
      noCardsHint: '配置参数后点击生成',
      copyAll: '复制全部',
      copied: '已复制!',
      valid: '有效',
      invalid: '无效',
      external: 'Namso-Gen'
    },
    identity: {
      title: '身份生成器',
      subtitle: '生成用于测试的虚假身份信息',
      selectCountry: '选择国家',
      generate: '生成身份',
      result: '生成结果',
      noIdentity: '暂无生成的身份',
      noIdentityHint: '选择国家后点击生成',
      personal: '个人信息',
      contact: '联系方式',
      address: '地址信息',
      account: '账户信息',
      name: '姓名',
      gender: '性别',
      male: '男',
      female: '女',
      birthday: '生日',
      age: '年龄',
      phone: '电话',
      email: '邮箱',
      street: '街道',
      city: '城市',
      state: '州/省',
      zip: '邮编',
      username: '用户名',
      password: '密码',
      external: '外部服务'
    },
    validator: {
      title: '验证服务',
      subtitle: '查询BIN信息和验证卡片详情',
      binLookup: 'BIN查询',
      cardValidation: '卡片验证',
      open: '打开'
    },
    resources: {
      title: '资源导航',
      subtitle: '快速访问卡片工具和服务',
      generators: '生成器',
      validators: '验证器',
      identityByCountry: '按国家生成身份'
    },
    footer: {
      disclaimer: '仅供教育学习使用',
      madeWith: '用心制作'
    }
  }
}

function App() {
  // ------------------------------------------------------------
  // 状态管理
  // ------------------------------------------------------------
  const [lang, setLang] = useState('zh')
  const t = translations[lang]
  const [activeTab, setActiveTab] = useState('generate')
  const [cardType, setCardType] = useState('visa')
  const [cardCountry, setCardCountry] = useState('')
  const [customBIN, setCustomBIN] = useState('')
  const [quantity, setQuantity] = useState(10)
  const [outputFormat, setOutputFormat] = useState('PIPE')
  const [generatedCards, setGeneratedCards] = useState([])
  const [identityCountry, setIdentityCountry] = useState('usa')
  const [generatedIdentity, setGeneratedIdentity] = useState(null)
  const [copied, setCopied] = useState(false)

  // ------------------------------------------------------------
  // 生成信用卡
  // ------------------------------------------------------------
  const handleGenerateCards = () => {
    let cards
    if (customBIN) {
      cards = generateCardFromBIN(customBIN, { quantity })
      if (!Array.isArray(cards)) cards = [cards]
    } else {
      cards = generateMultipleCards(quantity, cardType, cardCountry || null)
    }
    setGeneratedCards(cards)
  }

  // ------------------------------------------------------------
  // 生成身份信息
  // ------------------------------------------------------------
  const handleGenerateIdentity = () => {
    const identity = generateIdentity(identityCountry)
    setGeneratedIdentity(identity)
  }

  // ------------------------------------------------------------
  // 复制卡片信息
  // ------------------------------------------------------------
  const handleCopyCards = async () => {
    const text = generatedCards.map(card => formatCardOutput(card, outputFormat)).join('\n')
    await copyToClipboard(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ------------------------------------------------------------
  // 复制单个卡片
  // ------------------------------------------------------------
  const handleCopySingleCard = async (card) => {
    const text = formatCardForValidation(card.cardNumber, card.expiryMonth, `20${card.expiryYear}`, card.cvv)
    await copyToClipboard(text)
  }

  // ------------------------------------------------------------
  // 导航项配置
  // ------------------------------------------------------------
  const navItems = [
    { id: 'generate', label: t.nav.generator, icon: CreditCard },
    { id: 'identity', label: t.nav.identity, icon: User },
    { id: 'validate', label: t.nav.validator, icon: Shield },
    { id: 'sites', label: t.nav.resources, icon: Globe }
  ]

  // ------------------------------------------------------------
  // 切换语言
  // ------------------------------------------------------------
  const toggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh')

  // ------------------------------------------------------------
  // 渲染 - 科技简约风格（鲜艳配色）
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {/* 科技感背景 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* 头部导航 */}
      <header className="relative z-50 border-b border-violet-500/10 bg-[#0f0f1a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">{t.brand}</h1>
              <p className="text-[10px] text-violet-300/60 -mt-0.5">{t.brandSub}</p>
            </div>
          </div>

          {/* 中间导航 */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 右侧：语言切换 */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-violet-500/30 text-violet-300 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-all text-sm"
          >
            <Languages className="w-4 h-4" />
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
        </div>
      </header>

      {/* 移动端导航 */}
      <div className="md:hidden sticky top-0 z-40 border-b border-violet-500/10 bg-[#0f0f1a]/90 backdrop-blur-xl px-4 py-2">
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all rounded-lg ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                  : 'text-white/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 主内容区 */}
      <main className="relative z-10 max-w-6xl mx-auto px-8 py-10">
        
        {/* ==================== 卡号生成 ==================== */}
        {activeTab === 'generate' && (
          <div>
            {/* 页面标题 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">{t.generator.title}</h2>
              <p className="text-white/40 text-sm">{t.generator.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* 左侧：设置面板 */}
              <div className="lg:col-span-2">
                <div className="bg-violet-500/5 border border-violet-500/10 rounded-2xl p-6">
                  <h3 className="text-sm font-medium text-violet-300 mb-5 uppercase tracking-wider">{t.generator.config}</h3>
                  
                  {/* 自定义BIN */}
                  <div className="mb-4">
                    <label className="block text-xs text-violet-300/60 mb-1.5">{t.generator.customBin}</label>
                    <input
                      type="text"
                      value={customBIN}
                      onChange={(e) => setCustomBIN(e.target.value)}
                      placeholder={t.generator.customBinPlaceholder}
                      className="w-full px-3 py-2.5 bg-white/5 border border-violet-500/20 rounded-lg text-white placeholder-white/30 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm"
                    />
                  </div>

                  {/* 卡类型 */}
                  <div className="mb-4">
                    <label className="block text-xs text-violet-300/60 mb-1.5">{t.generator.cardType}</label>
                    <select
                      value={cardType}
                      onChange={(e) => setCardType(e.target.value)}
                      disabled={customBIN}
                      className="w-full px-3 py-2.5 bg-white/5 border border-violet-500/20 rounded-lg text-white transition-all disabled:opacity-40 text-sm"
                    >
                      {getSupportedCardTypes().map(type => (
                        <option key={type.code} value={type.code}>{type.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* 国家 */}
                  <div className="mb-4">
                    <label className="block text-xs text-violet-300/60 mb-1.5">{t.generator.country}</label>
                    <select
                      value={cardCountry}
                      onChange={(e) => setCardCountry(e.target.value)}
                      disabled={customBIN}
                      className="w-full px-3 py-2.5 bg-white/5 border border-violet-500/20 rounded-lg text-white transition-all disabled:opacity-40 text-sm"
                    >
                      <option value="">{t.generator.random}</option>
                      {getCardCountries().map(country => (
                        <option key={country.code} value={country.code}>{country.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* 数量和格式 */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div>
                      <label className="block text-xs text-violet-300/60 mb-1.5">{t.generator.quantity}</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-white/5 border border-violet-500/20 rounded-lg text-white transition-all text-sm"
                      >
                        {[10, 50, 100, 500].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-violet-300/60 mb-1.5">{t.generator.format}</label>
                      <select
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white/5 border border-violet-500/20 rounded-lg text-white transition-all text-sm"
                      >
                        {getOutputFormats().map(fmt => (
                          <option key={fmt.code} value={fmt.code}>{fmt.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 生成按钮 */}
                  <button
                    onClick={handleGenerateCards}
                    className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-violet-500/30 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Zap className="w-4 h-4" />
                    {t.generator.generate}
                  </button>

                  {/* 外部生成器链接 */}
                  <button
                    onClick={() => openCardGenerator(customBIN)}
                    className="w-full mt-3 py-2.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-lg hover:bg-violet-500/20 hover:text-white transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t.generator.external}
                  </button>
                </div>
              </div>

              {/* 右侧：结果显示 */}
              <div className="lg:col-span-3">
                <div className="bg-fuchsia-500/5 border border-fuchsia-500/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-medium text-fuchsia-300 uppercase tracking-wider">{t.generator.results}</h3>
                      {generatedCards.length > 0 && (
                        <p className="text-xs text-white/30 mt-1">{generatedCards.length} cards</p>
                      )}
                    </div>
                    {generatedCards.length > 0 && (
                      <button
                        onClick={handleCopyCards}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          copied 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20 hover:text-white'
                        }`}
                      >
                        {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? t.generator.copied : t.generator.copyAll}
                      </button>
                    )}
                  </div>

                  {generatedCards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-white/20">
                      <CreditCard className="w-12 h-12 mb-4" />
                      <p className="text-sm font-medium">{t.generator.noCards}</p>
                      <p className="text-xs mt-1">{t.generator.noCardsHint}</p>
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-[500px] overflow-y-auto custom-scrollbar">
                      {generatedCards.map((card, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-violet-500/10 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all group"
                        >
                          <div className="flex-1 min-w-0">
                            <code className="text-xs text-white/90 font-mono block truncate">
                              {formatCardOutput(card, outputFormat)}
                            </code>
                            <div className="flex items-center gap-2 text-[10px] text-white/40 mt-1">
                              <span className="text-violet-400 font-medium">{card.cardType}</span>
                              <span>·</span>
                              <span>BIN: {card.bin}</span>
                              <span>·</span>
                              <span className={card.isValid ? 'text-green-400' : 'text-red-400'}>
                                {card.isValid ? t.generator.valid : t.generator.invalid}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleCopySingleCard(card)}
                              className="p-1.5 text-white/30 hover:text-white rounded transition-all"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openBINChecker(card.bin)}
                              className="p-1.5 text-white/30 hover:text-white rounded transition-all"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 卡号验证 ==================== */}
        {activeTab === 'validate' && (
          <div>
            {/* 页面标题 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">{t.validator.title}</h2>
              <p className="text-white/40 text-sm">{t.validator.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(VALIDATOR_SITES).map(([key, site]) => (
                <div
                  key={key}
                  className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-5 hover:border-fuchsia-500/40 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-fuchsia-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{site.name}</h3>
                      <span className="text-[10px] text-fuchsia-400">
                        {site.type === 'bin' ? t.validator.binLookup : t.validator.cardValidation}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs mb-4 leading-relaxed">{site.description}</p>
                  <button
                    onClick={() => openCardValidator(key)}
                    className="w-full py-2 bg-fuchsia-500/10 text-fuchsia-300 text-sm rounded-lg hover:bg-fuchsia-500/20 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {t.validator.open}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 身份生成 ==================== */}
        {activeTab === 'identity' && (
          <div>
            {/* 页面标题 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">{t.identity.title}</h2>
              <p className="text-white/40 text-sm">{t.identity.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* 左侧：设置 */}
              <div className="lg:col-span-2">
                <div className="bg-violet-500/5 border border-violet-500/10 rounded-2xl p-6">
                  <h3 className="text-sm font-medium text-violet-300 mb-5 uppercase tracking-wider">{t.identity.selectCountry}</h3>
                  
                  <div className="mb-5">
                    <label className="block text-xs text-violet-300/60 mb-1.5">{t.generator.country}</label>
                    <select
                      value={identityCountry}
                      onChange={(e) => setIdentityCountry(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-violet-500/20 rounded-lg text-white transition-all text-sm"
                    >
                      {getIdentityCountries().map(country => (
                        <option key={country.code} value={country.code}>{country.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleGenerateIdentity}
                    className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-violet-500/30 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <User className="w-4 h-4" />
                    {t.identity.generate}
                  </button>

                  <div className="mt-6 pt-6 border-t border-violet-500/10">
                    <p className="text-xs text-violet-300/60 mb-3">{t.identity.external}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(IDENTITY_COUNTRIES).slice(0, 8).map(([key, country]) => (
                        <button
                          key={key}
                          onClick={() => openIdentityGenerator(key)}
                          className="px-2 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300/70 rounded text-xs hover:bg-violet-500/20 hover:text-white transition-all"
                        >
                          {country.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：结果 */}
              <div className="lg:col-span-3">
                <div className="bg-fuchsia-500/5 border border-fuchsia-500/10 rounded-2xl p-6">
                  <h3 className="text-sm font-medium text-fuchsia-300 mb-5 uppercase tracking-wider">{t.identity.result}</h3>
                  
                  {!generatedIdentity ? (
                    <div className="flex flex-col items-center justify-center py-16 text-white/20">
                      <User className="w-12 h-12 mb-4" />
                      <p className="text-sm font-medium">{t.identity.noIdentity}</p>
                      <p className="text-xs mt-1">{t.identity.noIdentityHint}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 基本信息 */}
                      <div className="bg-white/5 rounded-xl p-4 border border-violet-500/10">
                        <h4 className="text-violet-400 text-[10px] uppercase tracking-wider mb-3 font-medium">{t.identity.personal}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span className="text-white/40">{t.identity.name}</span><span className="text-white">{generatedIdentity.fullName}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">{t.identity.gender}</span><span className="text-white">{generatedIdentity.gender === 'male' ? t.identity.male : t.identity.female}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">{t.identity.birthday}</span><span className="text-white">{generatedIdentity.birthday}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">{t.identity.age}</span><span className="text-white">{generatedIdentity.age}</span></div>
                        </div>
                      </div>

                      {/* 联系信息 */}
                      <div className="bg-white/5 rounded-xl p-4 border border-violet-500/10">
                        <h4 className="text-fuchsia-400 text-[10px] uppercase tracking-wider mb-3 font-medium">{t.identity.contact}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span className="text-white/40">{t.identity.phone}</span><span className="text-white font-mono">{generatedIdentity.phone}</span></div>
                          <div><span className="text-white/40 block mb-1">{t.identity.email}</span><span className="text-white font-mono text-[10px] break-all">{generatedIdentity.email}</span></div>
                        </div>
                      </div>

                      {/* 地址信息 */}
                      <div className="bg-white/5 rounded-xl p-4 border border-violet-500/10">
                        <h4 className="text-pink-400 text-[10px] uppercase tracking-wider mb-3 font-medium">{t.identity.address}</h4>
                        <div className="space-y-2 text-xs">
                          <div><span className="text-white/40 block mb-1">{t.identity.street}</span><span className="text-white text-[10px]">{generatedIdentity.address.street}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">{t.identity.city}</span><span className="text-white">{generatedIdentity.address.city}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">{t.identity.state}</span><span className="text-white">{generatedIdentity.address.state}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">{t.identity.zip}</span><span className="text-white font-mono">{generatedIdentity.address.zipCode}</span></div>
                        </div>
                      </div>

                      {/* 账户信息 */}
                      <div className="bg-white/5 rounded-xl p-4 border border-violet-500/10">
                        <h4 className="text-amber-400 text-[10px] uppercase tracking-wider mb-3 font-medium">{t.identity.account}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span className="text-white/40">{t.identity.username}</span><span className="text-white font-mono">{generatedIdentity.username}</span></div>
                          <div><span className="text-white/40 block mb-1">{t.identity.password}</span><span className="text-green-400 font-mono text-[10px] break-all">{generatedIdentity.password}</span></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 外部网站 ==================== */}
        {activeTab === 'sites' && (
          <div>
            {/* 页面标题 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">{t.resources.title}</h2>
              <p className="text-white/40 text-sm">{t.resources.subtitle}</p>
            </div>

            {/* 生成器网站 */}
            <div className="mb-10">
              <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">{t.resources.generators}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(GENERATOR_SITES).map(([key, site]) => (
                  <div
                    key={key}
                    className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-5 hover:border-fuchsia-500/40 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-violet-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white mb-1">{site.name}</h4>
                        <p className="text-white/40 text-xs mb-2">{site.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {site.features.map((feature, i) => (
                            <span key={i} className="px-2 py-0.5 bg-violet-500/10 text-violet-300 text-[10px] rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(site.url, '_blank')}
                      className="w-full mt-4 py-2 bg-fuchsia-500/10 text-fuchsia-300 text-sm rounded-lg hover:bg-fuchsia-500/20 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t.validator.open}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 验证器网站 */}
            <div className="mb-10">
              <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">{t.resources.validators}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(VALIDATOR_SITES).map(([key, site]) => (
                  <div
                    key={key}
                    className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4 hover:border-fuchsia-500/40 transition-all"
                  >
                    <h4 className="text-sm font-semibold text-white mb-1">{site.name}</h4>
                    <p className="text-white/40 text-xs mb-3">{site.description}</p>
                    <button
                      onClick={() => window.open(site.url, '_blank')}
                      className="w-full py-1.5 bg-fuchsia-500/10 text-fuchsia-300 text-xs rounded hover:bg-fuchsia-500/20 hover:text-white transition-all"
                    >
                      {t.validator.open}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 身份生成网站 */}
            <div>
              <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">{t.resources.identityByCountry}</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {Object.entries(IDENTITY_COUNTRIES).map(([key, country]) => (
                  <button
                    key={key}
                    onClick={() => openIdentityGenerator(key)}
                    className="px-3 py-2 bg-violet-500/5 border border-violet-500/10 rounded-lg text-violet-300/70 text-xs hover:bg-violet-500/10 hover:text-white hover:border-fuchsia-500/40 transition-all"
                  >
                    {country.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="relative z-10 border-t border-violet-500/10 mt-20">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* 左侧品牌 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{t.brand}</p>
                <p className="text-[10px] text-violet-300/50">{t.footer.disclaimer}</p>
              </div>
            </div>

            {/* 联系方式 */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
              <a href="https://github.com/1837620622" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">GitHub</a>
              <span className="text-violet-500/30">|</span>
              <span>Vx: 1837620622</span>
              <span className="text-violet-500/30">|</span>
              <span>2040168455@qq.com</span>
              <span className="text-violet-500/30">|</span>
              <span className="text-fuchsia-400">传康kk</span>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="mt-6 pt-4 border-t border-violet-500/10 text-center">
            <p className="text-violet-300/30 text-xs">
              © 2026 CK Card Tools · {t.footer.madeWith} by 传康kk
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
