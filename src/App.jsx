import { useState } from 'react'
import { CreditCard, User, Shield, ExternalLink, Copy, RefreshCw, Globe, CheckCircle, Sparkles, Zap, ArrowRight } from 'lucide-react'
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

function App() {
  // ------------------------------------------------------------
  // 状态管理
  // ------------------------------------------------------------
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
  // 渲染 - 简约高级风格
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-black">
      {/* 头部 - 极简设计 */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white tracking-tight">Credit Card Generator</h1>
                <p className="text-xs text-white/40 mt-0.5">Professional Virtual Card Tools</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://github.com/1837620622" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors text-sm">GitHub</a>
              <div className="h-4 w-px bg-white/10"></div>
              <span className="text-white/60 text-sm">by 传康kk</span>
            </div>
          </div>
        </div>
      </header>

      {/* 导航标签 - 简约胶囊式 */}
      <nav className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex gap-1 py-4">
            {[
              { id: 'generate', label: 'Generator', labelZh: '生成器', icon: Zap },
              { id: 'validate', label: 'Validator', labelZh: '验证器', icon: Shield },
              { id: 'identity', label: 'Identity', labelZh: '身份', icon: User },
              { id: 'sites', label: 'Resources', labelZh: '资源', icon: Globe }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 主内容区 - 简约布局 */}
      <main className="max-w-6xl mx-auto px-8 py-10">
        
        {/* ==================== 卡号生成 ==================== */}
        {activeTab === 'generate' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 左侧：设置面板 */}
            <div className="lg:col-span-4">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Settings</h2>
                
                {/* 自定义BIN */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Custom BIN</label>
                  <input
                    type="text"
                    value={customBIN}
                    onChange={(e) => setCustomBIN(e.target.value)}
                    placeholder="e.g. 453590"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-white/20 transition-all text-sm"
                  />
                </div>

                {/* 卡类型 */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Card Type</label>
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    disabled={customBIN}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white transition-all disabled:opacity-40 text-sm"
                  >
                    {getSupportedCardTypes().map(type => (
                      <option key={type.code} value={type.code}>{type.name}</option>
                    ))}
                  </select>
                </div>

                {/* 国家 */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Country</label>
                  <select
                    value={cardCountry}
                    onChange={(e) => setCardCountry(e.target.value)}
                    disabled={customBIN}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white transition-all disabled:opacity-40 text-sm"
                  >
                    <option value="">Random</option>
                    {getCardCountries().map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>

                {/* 数量和格式 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Count</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white transition-all text-sm"
                    >
                      {[10, 50, 100, 500].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Format</label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white transition-all text-sm"
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
                  className="w-full py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Generate Cards
                </button>

                {/* 外部生成器链接 */}
                <button
                  onClick={() => openCardGenerator(customBIN)}
                  className="w-full mt-3 py-3 bg-white/[0.04] border border-white/[0.08] text-white/70 rounded-xl hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Namso-Gen
                </button>
              </div>
            </div>

            {/* 右侧：结果显示 */}
            <div className="lg:col-span-8">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-white">Generated Cards</h2>
                    {generatedCards.length > 0 && (
                      <span className="px-2.5 py-1 bg-white/[0.06] text-white/60 text-xs rounded-full">
                        {generatedCards.length}
                      </span>
                    )}
                  </div>
                  {generatedCards.length > 0 && (
                    <button
                      onClick={handleCopyCards}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        copied 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-white/[0.06] text-white/70 hover:bg-white/[0.1]'
                      }`}
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy All'}
                    </button>
                  )}
                </div>

                {generatedCards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-white/30">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-5">
                      <CreditCard className="w-8 h-8" />
                    </div>
                    <p className="text-base font-medium">No cards generated yet</p>
                    <p className="text-sm mt-2 text-white/20">Click "Generate Cards" to start</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[520px] overflow-y-auto">
                    {generatedCards.map((card, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all group"
                      >
                        <div className="flex-1 min-w-0">
                          <code className="text-sm text-white/90 font-mono block truncate">
                            {formatCardOutput(card, outputFormat)}
                          </code>
                          <div className="flex items-center gap-3 text-xs text-white/40 mt-2">
                            <span className="px-2 py-0.5 bg-white/[0.06] text-white/60 rounded">{card.cardType}</span>
                            <span>BIN: {card.bin}</span>
                            <span className={card.isValid ? 'text-green-400' : 'text-red-400'}>
                              {card.isValid ? '✓ Valid' : '✗ Invalid'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                          <button
                            onClick={() => handleCopySingleCard(card)}
                            className="p-2 text-white/40 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all"
                            title="Copy"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openBINChecker(card.bin)}
                            className="p-2 text-white/40 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all"
                            title="Check BIN"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 卡号验证 ==================== */}
        {activeTab === 'validate' && (
          <div className="space-y-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold text-white mb-3">Validation Services</h2>
              <p className="text-white/40 text-sm">Select a validation service to check card information</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {Object.entries(VALIDATOR_SITES).map(([key, site]) => (
                <div
                  key={key}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-5 group-hover:bg-white/[0.08] transition-all">
                    <Shield className="w-6 h-6 text-white/60" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{site.name}</h3>
                  <p className="text-white/40 text-sm mb-4 leading-relaxed">{site.description}</p>
                  <div className="inline-block px-2.5 py-1 bg-white/[0.04] text-white/50 text-xs rounded-lg mb-5">
                    {site.type === 'bin' ? 'BIN Lookup' : 'Card Validation'}
                  </div>
                  <button
                    onClick={() => openCardValidator(key)}
                    className="w-full py-3 bg-white/[0.06] text-white/80 font-medium rounded-xl hover:bg-white/[0.1] transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Site
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 身份生成 ==================== */}
        {activeTab === 'identity' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 左侧：设置 */}
            <div className="lg:col-span-4">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Identity Settings</h2>
                
                <div className="mb-6">
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Country</label>
                  <select
                    value={identityCountry}
                    onChange={(e) => setIdentityCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white transition-all text-sm"
                  >
                    {getIdentityCountries().map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleGenerateIdentity}
                  className="w-full py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Generate Identity
                </button>

                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <p className="text-xs text-white/40 mb-4 uppercase tracking-wider">External Services</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(IDENTITY_COUNTRIES).slice(0, 8).map(([key, country]) => (
                      <button
                        key={key}
                        onClick={() => openIdentityGenerator(key)}
                        className="px-3 py-2.5 bg-white/[0.03] border border-white/[0.06] text-white/60 rounded-lg hover:bg-white/[0.06] hover:text-white transition-all text-xs flex items-center justify-center gap-1.5"
                      >
                        {country.name}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：结果 */}
            <div className="lg:col-span-8">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Generated Identity</h2>
                
                {!generatedIdentity ? (
                  <div className="flex flex-col items-center justify-center py-24 text-white/30">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-5">
                      <User className="w-8 h-8" />
                    </div>
                    <p className="text-base font-medium">No identity generated yet</p>
                    <p className="text-sm mt-2 text-white/20">Click "Generate Identity" to start</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 基本信息 */}
                    <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04]">
                      <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                        <User className="w-3.5 h-3.5" />
                        Personal Info
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Name</span>
                          <span className="text-white font-medium">{generatedIdentity.fullName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Gender</span>
                          <span className="text-white">{generatedIdentity.gender === 'male' ? 'Male' : 'Female'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Birthday</span>
                          <span className="text-white">{generatedIdentity.birthday}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Age</span>
                          <span className="text-white">{generatedIdentity.age}</span>
                        </div>
                      </div>
                    </div>

                    {/* 联系信息 */}
                    <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04]">
                      <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" />
                        Contact Info
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Phone</span>
                          <span className="text-white font-mono text-xs">{generatedIdentity.phone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Email</span>
                          <span className="text-white text-xs font-mono truncate ml-4">{generatedIdentity.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* 地址信息 */}
                    <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04]">
                      <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" />
                        Address
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Street</span>
                          <span className="text-white text-xs">{generatedIdentity.address.street}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">City</span>
                          <span className="text-white">{generatedIdentity.address.city}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">State</span>
                          <span className="text-white">{generatedIdentity.address.state}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Zip</span>
                          <span className="text-white font-mono">{generatedIdentity.address.zipCode}</span>
                        </div>
                      </div>
                    </div>

                    {/* 账户信息 */}
                    <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04]">
                      <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5" />
                        Account
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Username</span>
                          <span className="text-white font-mono">{generatedIdentity.username}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/40">Password</span>
                          <span className="text-green-400 font-mono text-xs">{generatedIdentity.password}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 外部网站 ==================== */}
        {activeTab === 'sites' && (
          <div className="space-y-10">
            {/* 标题 */}
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold text-white mb-3">External Resources</h2>
              <p className="text-white/40 text-sm">Quick access to generators and validators</p>
            </div>

            {/* 生成器网站 */}
            <div>
              <h3 className="text-sm font-medium text-white/50 mb-5 uppercase tracking-wider">Generators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(GENERATOR_SITES).map(([key, site]) => (
                  <div
                    key={key}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.08] transition-all">
                        <CreditCard className="w-6 h-6 text-white/60" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-white mb-1">{site.name}</h4>
                        <p className="text-white/40 text-sm mb-3">{site.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {site.features.map((feature, i) => (
                            <span key={i} className="px-2 py-1 bg-white/[0.04] text-white/50 text-xs rounded-lg">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(site.url, '_blank')}
                      className="w-full mt-5 py-3 bg-white/[0.06] text-white/80 font-medium rounded-xl hover:bg-white/[0.1] transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Site
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 验证器网站 */}
            <div>
              <h3 className="text-sm font-medium text-white/50 mb-5 uppercase tracking-wider">Validators</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(VALIDATOR_SITES).map(([key, site]) => (
                  <div
                    key={key}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center mb-4 group-hover:bg-white/[0.08] transition-all">
                      <Shield className="w-5 h-5 text-white/60" />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-1">{site.name}</h4>
                    <p className="text-white/40 text-sm mb-4">{site.description}</p>
                    <button
                      onClick={() => window.open(site.url, '_blank')}
                      className="w-full py-2.5 bg-white/[0.06] text-white/80 font-medium rounded-lg hover:bg-white/[0.1] transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 身份生成网站 */}
            <div>
              <h3 className="text-sm font-medium text-white/50 mb-5 uppercase tracking-wider">Identity by Country</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {Object.entries(IDENTITY_COUNTRIES).map(([key, country]) => (
                  <button
                    key={key}
                    onClick={() => openIdentityGenerator(key)}
                    className="px-4 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white/60 hover:bg-white/[0.06] hover:text-white transition-all text-sm flex items-center justify-center gap-2 group"
                  >
                    {country.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 页脚 - 简约风格 */}
      <footer className="border-t border-white/[0.05] mt-16">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Credit Card Generator</p>
                <p className="text-xs text-white/30">For educational purposes only</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <a href="https://github.com/1837620622" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <span className="text-white/20">|</span>
              <span>Vx: 1837620622</span>
              <span className="text-white/20">|</span>
              <span>传康kk</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
