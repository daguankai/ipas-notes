// 🔐 在這裡設定您的管理者密碼（預設為 1234）
const ADMIN_PASSWORD = "1234"; 

const searchInput = document.getElementById('searchInput');
const tabButtons = document.querySelectorAll('.tab-btn');
const cardContainer = document.getElementById('cardContainer');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminStatus = document.getElementById('adminStatus');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const importJsonBtn = document.getElementById('importJsonBtn');
const importFile = document.getElementById('importFile');
const formSection = document.getElementById('formSection');
const noteForm = document.getElementById('noteForm');

// 編輯 Modal 元素
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const editIdInput = document.getElementById('editId');
const editTitleInput = document.getElementById('editTitle');
const editCategorySelect = document.getElementById('editCategory');
const editTagInput = document.getElementById('editTag');
const editContentTextarea = document.getElementById('editContent');

let currentCategory = 'all';
let isAdminUnlocked = false;

// 預設示範筆記
const defaultNotes = [{"id":"1","title":"人工智慧基礎概論1-筆記","category":"l1-ai-basic","tag":"#人工智慧基礎概論","content":"iPAS AI應用規劃師初級 科目一\n鑑別式AI、生成式AI\n高頻生成式模型：GAN、VAE、擴散模型、Transformer\n\nL11 機器學習原理、訓練流程與常見模型\n三大學習類型：監督式學習、非監督式學習、強化學習\n監督式學習：分類（預測類別）、回歸（預測連續數值，邏輯回歸用於分類）\n驗證集、測試集（最後用於測試）\n過擬合\n模型訓練：資料準備>模型選擇>模型訓練>模型評估\n\nL11 資料處理高頻考點：型態、清洗、統計與隱私\n資料處理：搜集資料>資料清洗>資料轉換>資料分析\n三大資料型態：結構化有固定欄列（表格）、半結構化帶有標籤（json或xml）、非結構化完全沒有固定格式（影音或文字）\n清洗：解決品質問題（缺值、重複、錯誤、離群）\n轉換：調整格式尺度（縮放、編碼、正規化）\n敘述性分析：回答發生什麼\n診斷性分析：回答為什麼發生\n平均數：整體平均，易受極端值影響\n中位數：排序後中間值，對極端值高度穩定\n標準差：衡量資料分散程度\np值：衡量顯著性，小於阿發就是虛無假設\n\nL11 AI 的定義、分類、應用與治理\nAI分類：分析型AI、預測型AI、生成式AI\n\nL11402 鑑別式 AI 與生成式 AI 整合應用\n三大整合價值：資料增強、多模態處理、提升泛化能力\n\n鑑別式AI核心模型：\n邏輯回歸：基礎二元分類\n支援向量機SVM：尋找最佳分類邊界\n決策樹：以樹狀規則進行判斷\n隨機森林：整合多顆決策樹提高穩定性\n神經網路：處理複雜特徵與非線性關係\n\n生成式AI四大模型：\nGAN：透過生成器與鑑別氣對抗學習生成逼真資料\nVAE：以概率生成方式學習資料潛在\n擴散模型：逐步加入與去除雜訊已生成高品質圖像\nTransformer：根據提示詞逐步生成連貫文字\n\nL11302 常見機器學習模型：迴歸、SVM、決策樹怎麼選\n線性回歸：預測連續數值，如房價或銷售額\n邏輯回歸：判斷二元問題\nKNN(K-最近鄰)、K-means（此時K為群組數）\n進階演算法關鍵字：\nSVM：最大化決策邊界\n決策樹：清楚規則與可解釋\n隨機森林：多棵樹一起決定\n神經網路：處理複雜特徵與非線性關係\n\nL11301 機器學習基本原理：監督式、非監督式、強化學習\n機器學習核心要素：資料、模型、損失函數\n三大學習類型：監督式（有標籤）、非監督式（沒標籤）、強化學習（互動獎勵）\n模型訓練：資料準備>模型選擇>模型訓練>模型評估>模型優化\n\nL11203 資料隱私與安全：個資、授權、去識別化怎麼考\n保護鑰匙：目的限制、最小必要、去識別化、授權\n資訊安全CIA三要素：機密性、完整性、可用性"},{"id":"1791703364938","title":"生成式AI應用與規劃1-筆記","category":"l1-gen-ai","tag":"#生成式AI應用與規劃","content":"L12101 No Code Low Code 的基本概念\nNo Code：透過圖形介面讓非技術者建立快速原型\nLow Code：結合視覺化工具與少量程式碼，適合深度整合\n生成式AI加速：自動生成程式碼、提供介面設計建議、產出行銷文案、分析專案資料，但有資安疑慮\n\n\nL12102 No Code Low Code 的優勢與限制\n評估重點：目標用戶、技術需求、擴展性、系統整合、安全合規、成本\n\n\nL12201 生成式 AI 應用領域與常見工具\n模型架構：GAN、VAE、Transformer\n推理機制：溫度參數、Top-k採樣、核採樣\n工具趨勢：跨工具整合、安全控管、個人化參數建議\nAlaaS：AI的雲端服務\n\n\n12201 生成式 AI 應用領域與常見工具\n生成式 AI 核心價值：內容生成、資料分析、自動化流程與輔助決策（需考慮各種不同產業的對照）\n\n\nL12202 如何善用生成式 AI 工具\n生成式 AI 的體驗優化與NLP應用：自然語言指令、直觀操作設計、智慧化參數建議、客服導入NLP提升效率\n防範幻覺：檢查品質、標注引用、手動修正、人工審閱\n\n\nL12301 生成式 AI 導入評估\n需求評估步驟：痛點識別、應用場景分析、技術對接性評估\n資源與基礎設施評估：技術人才、資料品質、運算資源、儲存空間\nPOC(小規模試點)：驗證技術可行並快速收集回饋\n階段性擴展策略：小規模試點>技術驗證>階段性擴展\n\n\nL12302 生成式 AI 導入規劃\n導入規劃步驟：確認目標與範圍、檢視企業資源、排定優先順序、估算ROI\n應用範圍選定：客服回應、內部資料檢索、報表生成、流程自動化（上述為較為可行具體的業務）\n資源檢視面向：資料、技術基礎設施、預算、人力、供應商支援\n優先順序評估標準：業務價值、技術可行性、導入難易度、風險與長期策略\nROI評估\n\n\nL12302 生成式 AI 導入規劃\n資料飄移\n價值擴散\n\n\nL12303 生成式 AI 風險管理\n常見風險：資料安全、倫理偏見、法律合規、責任歸屬\n資料安全風險：訓練資料洩漏、反向工程、提示詞與對抗性攻擊\n資料安全與個資保護：權限控管、合規、匿名化、加密"},{"id":"1791703456242","title":"機器學習技術與應用1-筆記","category":"l2-ml-tech","tag":"#機器學習技術與應用","content":"L23101 機率統計之機器學習基礎應用\n離散機率：處理可數的類別，如是否為詐欺\n連續機率：處理可測量的範圍，如溫度或價格\n機率值量函數（PMF）用於離散資料\n機率密度函數（PDF）用於連續資料\n貝氏定理：更新風險，加入資料後再評估\n期望值：長期預測的平均結果，用於模型預測與估算\n變異數：資料的分散程度，用於風險與穩定性評估\n偏態：資料分布的不對稱性，用於特徵轉換與前處理\n峰度：資料尾部的厚重程度，用於離群值與異常偵測\n機器學習工作流程：資料準備（檢查偏見）>模型訓練（擬合狀態）>模型評估（指標選擇）>治理與部署（合規與風險）\n\nL23102 線性代數之機器學習基礎應用\n向量：單一資料的特徵清單\n矩陣：許多向量組合而成的資料集網格\n線性變換：將資料映射到新的特徵空間，讓模型找出隱藏的規律與特徵\n最小平方估計：在所有可能的線條中找到一條讓所有預測誤差總和達到最小的線\n逐元素非負：\n\nL23103 數值優化技術與方法\n最佳化問題與損失函數：找尋最低預測誤差的框架，以及用來衡量目前誤差高度的高度計\n損失函數：根據輸入、輸出、限制、風險來決定\n梯度下降法：\nGD：全部資料量，速度慢，平穩度高\nSGD：單筆資料量，速度快，平穩度低\nMini-batch：小批次資料量，速度適中，平穩度適中\n\nL23201 機器學習原理與技術\n機器學習：資料準備>任務定義>假設空間>模型訓練>評估與治理\n\nL23202 迴歸演算法：線性、正則化、SVR、樹模型與 Boosting\n線性迴歸：找出最能代表變數之間線性關係的直線\n*當需要特徵選擇或資料稀疏，選用Lasso(L1)，可將權重壓縮到零\n*當處理多重共線性或特徵權重過大，選用Ridge(L2)，會縮小權重但不歸零\n支持向量迴歸（SVR）：處理高維度空間與尋找容忍邊界\n決策樹迴歸：極高可解釋性，如流程度圖直觀，要注意過擬合現象\n隨機森林迴歸：對離群值具穩健性，不易有過擬合現象\nXGBoost：加入正則化，運算效率好\nLightGBM：大數據、訓練極快與低記憶體消耗\n\nL23202 分類演算法：邏輯迴歸、SVM、決策樹、KNN、貝式、集成\n邏輯迴歸：輸出機率值來進行分類\n決策樹：透過一連串分支規則進行分類，具備高透明度與高解釋性\nKNN：透過計算空間中最近的鄰居分類，但在推論階段會消費極高運算資源\n樸素貝氏分類：最大特徵與限制是假設輸入資料間都是獨立的\n模型選擇：確認任務目標>辨識資料型態>評估硬體限制>選擇最適模型\n\nL23202 沒有標籤也能學：分群、降維、關聯規則與異常偵測\n分群分析：在沒標準答案下根據特徵將相似的資料放在同組，如K-means與階層式分群\n降維：線性降維方法PCA，速度快，適合將立體特徵壓縮平坦化；非線性降維方法如t-SNE、UMAP，前者適合資料視覺化，後者具備高擴展性與速度\n關聯規則：找出哪些東西常一起出現並建立條件規則，常見演算法如有Apriori與FP-Growth\n異常偵測方法：Isolation Forest透過隨機切分孤立異常值，One-Class SVM畫出正常資料邊界\n機器學習完整流程：資料準備>模型訓練>模型評估>模型部署\n\nL23203 深度學習基礎：神經元、反向傳播、MLP\n人工神經元：接收輸入、乘上權重、加上偏誤後產生輸出的基本計算單位\n活化函數：決定神經元訊號是否該傳遞下去\n神經網路學習流程：前向傳播>計算誤差>反向傳播\nMLP多層感知器：預測客戶流失率、供應鏈需求，分析結構化企業資料\n\nL23203 CNN、RNN、Transformer 與注意力機制\nCNN主攻網格與影像，RNN用於時間序列，Transformer 用於文字與語言\nCNN：從網格中萃取局部特徵，限制為需要固定輸入尺寸，容易受到對抗性攻擊\nRNN：一步步記住序列資料，限制為梯度消失與運算緩慢，風險為資料偏移\nTransformer：限制為高運算力與記憶體成本，風險為幻覺與資料洩漏\n\nL23203 Autoencoder、GAN 與深度學習框架\nAutoencoder：將龐大資訊濃縮成精華，在試圖寫出原始內容的重點摘要\nGAN：\nTensorFlow/Keras：企業部署，生產穩定，多裝置部署\nPyTorch/JAX/MXNet：學術研究、動態靈活、快速原型開發\n\nL23301 數據準備與特徵工程\n\nL23302 模型選擇與架構設計\n\nL23303 訓練流程、資料分割、K fold 與訓練監控\nK-fold交叉驗證：將資料切成K等分，輪流拿其中一份當驗證，其餘當作訓練，確保每份資料都會被測試\nLOOCV：\n早停策略：當驗證集表現不再進步，甚至開始變差時立刻停止，防禦過擬合\n\nL23303 分類、迴歸與不平衡資料評估指標\nMSE（均方誤差）：針對迴歸任務，預測值與真實差異的平方平均，嚴厲懲罰極端預側值\nF1--Score：針對分類任務，Precision和Recall的調和平均數，在不平衡資料下提供平衡兩者考量的單一分數\nRecall（召回率）：不漏抓的能力\nPrecision（精准率）：不亂抓的能力\n\nL23304 學習率、批次大小、網路深度寬度與激活函數\n學習率：控制模型在每次迭代中朝損失函數最小值邁進的步長\n網路深度：神經網路的層數，學習抽象特徵\n網路寬度：每層神經元素量，捕捉特徵細節\n活化函數選擇：ReLU>Sigmoid>Tanh\n\nL23304 優化器與正則化：SGD、Momentum、Adagrad、Adam、L1L2\n四大優化器\nSGD：逐步更新，易卡在平緩小坑洞\nMomentum：加上慣性，衝破局部最小值\nAdagead：稀疏特徵，客製化學習率\nAdam：複雜任務，深度學習首選\n正則化：控制模型複雜度，在模型訓練時即要加入，有L1(Lasso)、L2(Ridge)等方法，正則化係數為平衡擬合度與泛化能力\n\nL23304 防過擬合、資料增強、重取樣、模型壓縮與加速\n防過擬合方法：\nElastic Net：結合L1、L2懲罰向的迴歸方法\nDropout：隨機丟棄神經元，避免過度依賴特定特徵\nEarly Stopping：監控驗證誤差，不再下降時提早停止\n不平衡資料：需用SMOTE或類別權重調整\n模型部署：邊緣裝置要注意剪枝與量化\n\nL23401 機器學習治理、隱私風險與風險評估\n模型訓練：關注準確率與模型評估\n模型部署：關注運算延遲、記憶體限制\n\nL23401 匿名化、隱私強化技術與 AI 訓練合規\n基礎匿名化技術：遮蔽（隱藏或替換資料）、雜湊（將資料轉換為固定長度的單向亂碼）、泛化（降低資料精準度）、裝箱（處理連續資料）\n進階隱私強化技術：K匿名（隱藏個體）、聯邦學習（訓練時不共享學習資料）、同態加密\nAI 訓練合規：資料最小化，僅收集模型必須特徵\n\nL23402 AI 偏見、資料偏見與模型偏見\n偏見類型：來源、內容、流程\n目標函數偏誤拆解：輸入、輸出、限制、風險\n\nL23402 公平性衡量指標與評估工具\n四大公平性衡量指標：\nDemographic Parity：追求最終比例一致，但犧牲模型準確度\nEqual Opportunity：關注合格者通過率，但忽略陽性差異\nEqualized Odds：兼顧真假陽性，最嚴格難以達成\nDisparate Impact：檢視群體比例差異，僅關注結果比例\n評估工具：\nAIF360：包含完整演算法，涵蓋前中後處理，適合全面診斷\nFairlearn：針對分類或回歸偏見評估直觀，適合結合現有框架\n\nL23402 去偏技術與企業 AI 公平治理\n去偏技術：\nRe-sampling（重新採樣）：調整資料比例，確保少數群體的資料不平衡\nFeature Neutralization：消除特徵與敏感屬性間隱藏的數學相關性，剔除敏感資訊但保留對預測有用的特徵\n模型內去偏：公平性約束、對抗式去偏、後處理校正"},{"id":"1791703507951","title":"大數據處理分析與應用1-筆記","category":"l2-big-data","tag":"#大數據處理分析與應用","content":"L22101 敘述性統計與資料摘要技術\n資料探索：集中趨勢、離散程度、分佈形狀\n集中趨勢指標：算術平均、幾何平均、調和平均、眾數、中位數\n平均數：容易受到極端值影響\n中位數：抗雜訊強，適合嚴重偏態\n離散程度：描述資料偏離中心的距離，包含全距、四分位距、變異數與標準差\n分佈形狀：偏度（是否對稱）、峰度（尾端厚度等）\n\nL22102 機率分佈與資料分佈模型：伯努利、二項、泊松、常態\n機率分佈：描述隨機變數所有可取值與其發生機率的模型\n離散型分佈：伯努利、二項、泊松分佈\n連續型分佈：常態、指數、卡方分佈\n\nL22103 假設檢定與統計推論：p 值、信賴區間、型一型二錯誤\n檢定五步驟：假設、水準、統計量、p值、決策\n型一錯誤為棄真、型二錯誤為存偽\n\nL22103 假設檢定與統計推論：t 檢定、ANOVA、卡方檢定怎麼選\nt檢定：比較平均數的方法，用來確認差異是具備統計顯著性或是單純的隨機巧合\nANOVA：用於比較三組以上平均數差異\n卡方檢定：用於類別資料適合度或獨立性\n比例檢定：專門處理百分比檢定\n相關性分析：衡量變數關聯的方向與強度\n非參數檢定：適合不符合參數假設的情境\n\nL22201 數據收集與清理：完整性、正確性、一致性怎麼看\n資料：分為結構性和非結構性\n資料常見品質問題：缺值、重複、錯誤、格式不一致、偏差、過時、雜訊\n資料品質衡量指標：完整性、正確性、一致性、即時性、唯一性、有效性\n\nL22202 數據儲存與管理：資料湖、分散式儲存與治理怎麼選\n資料型態：結構化資料常放在關連式資料庫或資料倉儲，非結構化與半結構化常需要資料湖或物件儲存\n\nL22203 數據處理技術與工具：轉換、編碼、縮放與特徵工程\n提取強大特徵：特徵選擇、特徵衍生、資料增強\n\nL22203 數據處理技術與工具：分散式處理框架與資料管線\nHadoop：常與分散式儲存與MapReduce相關\nSpark：常用於記憶體運算與大數據分析處理\n\nL22301 統計學在大數據中的應用：資料越大不代表越準\n\nL22302 常見的大數據分析方法：近似統計、時序分析、網路分析\n近似統計：使用抽樣、Sketch或近似演算法快速估計統計量\n時序分析：關注隨時間變化的資料，如趨勢、季節性、週期與異常的資料\n網路分析：中心性、社群偵測、連結預測、關係強度\n\nL22302 常見的大數據分析方法：文字、地理空間、異常偵測怎麼選\n文字分析：包含分類、情感分析、關鍵詞、主題\n地理空間分析：處理位置、距離、區域、熱點分佈\n異常偵測：找出不符合常態模式的資料點\n\nL22303 數據可視化工具：數值、關聯、類別、時間序列圖表\n數據可視化五大價值：探索資料、呈現趨勢、比較差異、發現異常、溝通洞察\n數值型資料：直方圖、箱形圖、散布圖、密度圖\n類別與比例型資料：長條圖、堆疊圖、圓餅圖\n關聯性資料：散布圖、相關矩陣、網路圖\n時間序列資料：折線圖、面積圖、趨勢圖\n\nL22401 大數據與機器學習：大數據如何重構模型流程\n\nL22402 大數據在鑑別式 AI 中的應用：分類、預測、偵測怎麼落地\n\nL22403 大數據在生成式 AI 中的應用：資料品質決定生成品質\n\nL22404 大數據隱私保護、安全與合規：資料能用，不代表可以亂用"},{"id":"1791703539428","title":"人工智慧技術應用規劃1-筆記","category":"l2-ai-plan","tag":"#人工智慧技術應用規劃","content":"L21101 自然語言處理技術與應用：NLP、NLU、NLG 一次分清楚\nNLP（自然語言處理）：讓電腦理解、處理並產生自然語言的AI技術總稱\nNLU（自然語言理解）：著重理解輸入語言的語意、意圖、情緒與結構\nNLG（自然語言生成）：著重把資料或邏輯轉換為自然流暢的人類語言\nNLP（自然語言處理）技術四大階段：\n規則式方法：依靠人工設計語法規則與詞彙辭典\n統計語言模型：使用大量語料訓練機率模型（N-gram、HMM）\n深度學習模型：使用神經網路處理語言序列（RNN、LSTM）\n預測語言模型：大規模語料預訓練後微調（BERT、GPT）\n\nL21101 自然語言處理技術與應用：NLP 前處理與詞彙向量化\n文字前處理常見步驟：斷句、分詞、去除雜訊、正規化\n詞彙向量化：One-hot編碼（稀疏向量，缺乏語意相似性）、Bag of Words（Bow，看重詞頻，忽略語序）、N-grams（將鄉林連續詞組綁在一起並保留局部詞序）\n靜態詞嵌入：同時對應固定向量，如Word2Vev、GloVe\n語境型詞嵌入：依上下文產生語意表示，如BERT\n\nL21101 自然語言處理技術與應用：Transformer、BERT、GPT 到 RAG\nTransformer：透過注意力機制處理序列資料，能捕捉長距離語意關係\nBERT：常用於語言理解（分類、問答、NER）\nGPT：常用於文字生成與對話式應用\nPrompt：引導輸出\nRAG：降低幻覺風險\nLoRA：提升參數效率\n\nL21102 電腦視覺技術與應用：機器如何看懂影像\n\nL21102 電腦視覺技術與應用：從影像前處理到 CNN、偵測與分割\n影像前處理步驟：標註、縮放與裁切、去噪、標準化、資料增強\n\nL21103 生成式 AI 技術與應用：文本、圖像、語音生成\n三大核心生成模型\nGAN：對抗訓練，產生資料\n自迴歸/GPT：文字序列，文本生成\n擴散模型：高品質圖像，圖像生成\n\nL21104 多模態人工智慧應用：文字、影像、語音如何一起理解\n多模態AI：整合文字、影像、語音等來源，提升理解與判斷能力\n跨模泰表示：映射到比較空間\n融合技術：整合於資料、特徵或決策層\n智慧語音助理處理流程：語音輸入、ASR轉文字、NLU意圖分析\n\nL21104 多模態人工智慧應用：應用場景、風險與未來趨勢\n\nL21201 AI 導入評估：需求、痛點、可行性與 POC\n\nL21202 AI 導入規劃：從 POC 到落地要怎麼安排\n\nL21203 AI 風險管理：技術、組織、人力與法規風險\n\nL21203 AI 風險管理：MLOps 監控與風險控管怎麼做\n\nL21301 數據準備與模型選擇：資料清理、品質檢核與特徵工程\n\nL21302 AI 技術系統集成與部署：MLOps 與持續優化"}];

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    loadNotes();
});

// 管理員解鎖按鈕事件
adminLoginBtn.addEventListener('click', () => {
    if (!isAdminUnlocked) {
        const pwd = prompt("請輸入管理者密碼以解鎖編輯/新增與備份還原功能：");
        if (pwd === ADMIN_PASSWORD) {
            isAdminUnlocked = true;
            adminLoginBtn.classList.add('hidden');
            adminStatus.classList.remove('hidden');
            exportJsonBtn.classList.remove('hidden');
            importJsonBtn.classList.remove('hidden');
            formSection.classList.remove('hidden');
            alert("解鎖成功！現在可以新增、編輯、刪除筆記，以及匯出/匯入 JSON 備份。");
            loadNotes(); 
        } else if (pwd !== null) {
            alert("密碼錯誤！");
        }
    }
});

// 📥 匯出 JSON 備份功能
exportJsonBtn.addEventListener('click', () => {
    const notesData = localStorage.getItem('ipas_notes');
    if (!notesData) {
        alert("目前沒有任何筆記資料可以匯出！");
        return;
    }

    const blob = new Blob([notesData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    a.download = `ipas-notes-backup-${dateStr}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// 📤 匯入還原 JSON 功能（點擊按鈕觸發隱藏的 file input）
importJsonBtn.addEventListener('click', () => {
    importFile.click();
});

// 讀取上傳的 JSON 檔案並覆寫 LocalStorage
importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);
            
            // 簡易格式檢查：確認是否為陣列且包含必要欄位
            if (!Array.isArray(importedData)) {
                throw new Error("JSON 格式不正確：根結點必須是陣列");
            }

            if (confirm(`確定要匯入並覆蓋目前的筆記資料嗎？（共 ${importedData.length} 筆資料）`)) {
                localStorage.setItem('ipas_notes', JSON.stringify(importedData));
                loadNotes();
                alert("筆記資料還原成功！");
            }
        } catch (error) {
            alert("匯入失敗：檔案格式錯誤或不是有效的 iPAS 備份 JSON 檔。");
            console.error(error);
        }
        // 清空檔案選擇器，確保重複上傳同一個檔案也能觸發 change 事件
        importFile.value = '';
    };
    reader.readAsText(file);
});

// 卡片互動事件委派
cardContainer.addEventListener('click', (e) => {
    const target = e.target;
    const card = target.closest('.card');
    if (!card) return;

    const id = card.getAttribute('data-id');

    // 複製重點
    if (target.classList.contains('copy-btn')) {
        const textToCopy = card.getAttribute('data-content');
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = target.textContent;
            target.textContent = '已複製！';
            target.classList.add('copied');
            setTimeout(() => {
                target.textContent = originalText;
                target.classList.remove('copied');
            }, 1500);
        });
    }

    // 展開/收合
    if (target.classList.contains('expand-btn')) {
        card.classList.toggle('expanded');
        target.textContent = card.classList.contains('expanded') ? '收合內容 ▲' : '展開閱讀 ▼';
    }

    // 刪除筆記 (需解鎖)
    if (target.classList.contains('delete-btn')) {
        if (confirm('確定要刪除這筆筆記嗎？')) {
            deleteNote(id);
            loadNotes();
        }
    }

    // 編輯筆記 (需解鎖)
    if (target.classList.contains('edit-btn')) {
        openEditModal(id);
    }
});

// 分類與搜尋篩選
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        filterAndRender();
    });
});

searchInput.addEventListener('input', () => {
    filterAndRender();
});

// 新增筆記表單
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newNote = {
        id: Date.now().toString(),
        title: document.getElementById('newTitle').value.trim(),
        category: document.getElementById('newCategory').value,
        tag: document.getElementById('newTag').value.trim(),
        content: document.getElementById('newContent').value.trim()
    };

    saveNote(newNote);
    noteForm.reset();
    document.querySelector('.form-section details').removeAttribute('open');
    loadNotes();
});

// 編輯 Modal 提交
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedNote = {
        id: editIdInput.value,
        title: editTitleInput.value.trim(),
        category: editCategorySelect.value,
        tag: editTagInput.value.trim(),
        content: editContentTextarea.value.trim()
    };

    updateNote(updatedNote);
    closeEditModal();
    loadNotes();
});

cancelEditBtn.addEventListener('click', closeEditModal);

function openEditModal(id) {
    const notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    const note = notes.find(n => n.id === id);
    if (!note) return;

    editIdInput.value = note.id;
    editTitleInput.value = note.title;
    editCategorySelect.value = note.category;
    editTagInput.value = note.tag;
    editContentTextarea.value = note.content;

    editModal.classList.add('active');
}

function closeEditModal() {
    editModal.classList.remove('active');
}

// LocalStorage 資料管理
function initStorage() {
    if (!localStorage.getItem('ipas_notes')) {
        localStorage.setItem('ipas_notes', JSON.stringify(defaultNotes));
    }
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    renderCards(notes);
}

function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    notes.push(note);
    localStorage.setItem('ipas_notes', JSON.stringify(notes));
}

function updateNote(updatedNote) {
    let notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    notes = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
    localStorage.setItem('ipas_notes', JSON.stringify(notes));
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('ipas_notes')) || [];
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('ipas_notes', JSON.stringify(notes));
}

// 渲染卡片邏輯
function renderCards(notesToRender) {
    cardContainer.innerHTML = '';
    
    const term = searchInput.value.toLowerCase().trim();
    const filtered = notesToRender.filter(note => {
        const matchCategory = (currentCategory === 'all' || note.category === currentCategory);
        const matchSearch = (note.title.toLowerCase().includes(term) || note.content.toLowerCase().includes(term));
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        cardContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #7f8c8d; padding: 40px;">沒有找到相關的筆記內容</p>';
        return;
    }

    filtered.forEach(note => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', note.id);
        card.setAttribute('data-category', note.category);
        card.setAttribute('data-title', note.title);
        card.setAttribute('data-content', note.content);

        const adminActionsHTML = isAdminUnlocked ? `
            <div class="card-actions">
                <button class="edit-btn">編輯</button>
                <button class="delete-btn">刪除</button>
            </div>
        ` : '<div></div>';

        card.innerHTML = `
            <div class="card-header">
                <h3>${escapeHTML(note.title)}</h3>
                <span class="tag">${escapeHTML(note.tag)}</span>
            </div>
            <div class="card-body">
                <p>${escapeHTML(note.content)}</p>
            </div>
            <button class="expand-btn">展開閱讀 ▼</button>
            <div class="card-footer">
                ${adminActionsHTML}
                <button class="copy-btn">複製重點</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

function filterAndRender() {
    loadNotes();
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
