<!--

#radical-reactions
http://www.github.com/braunsg/radical-reactions
Created by: Steven Braun
Last edited: 2016-08-17

Source code for the Radical Reactions visualization project available at
http://www.stevengbraun.com


This code is freely distributed under an MIT permissive license.

-->
<?php

$grades = array("1" => "一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六",
				"2" => "引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話",
				"3" => "悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起期客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和",
				"4" => "愛案以衣位囲胃印英栄塩億加果貨課芽改械害街各覚完官管関観願希季紀喜旗器機議求泣救給挙漁共協鏡競極訓軍郡径型景芸欠結建健験固功好候航康告差菜最材昨札刷殺察参産散残士氏史司試児治辞失借種周祝順初松笑唱焼象照賞臣信成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲貯兆腸低底停的典伝徒努灯堂働特得毒熱念敗梅博飯飛費必票標不夫付府副粉兵別辺変便包法望牧末満未脈民無約勇要養浴利陸良料量輪類令冷例歴連老労録",
				"5" => "圧移因永営衛易益液演応往桜恩可仮価河過賀快解格確額刊幹慣眼基寄規技義逆久旧居許境均禁句群経潔件券険検限現減故個護効厚耕鉱構興講混査再災妻採際在財罪雑酸賛支志枝師資飼示似識質舎謝授修述術準序招承証条状常情織職制性政勢精製税責績接設舌絶銭祖素総造像増則測属率損退貸態団断築張提程適敵統銅導徳独任燃能破犯判版比肥非備俵評貧布婦富武復複仏編弁保墓報豊防貿暴務夢迷綿輸余預容略留領",
				"6" => "異遺域宇映延沿我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除将傷障城蒸針仁垂推寸盛聖誠宣専泉洗染善奏窓創装層操蔵臓存尊宅担探誕段暖値宙忠著庁頂潮賃痛展討党糖届難乳認納脳派拝背肺俳班晩否批秘腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優幼欲翌乱卵覧裏律臨朗論",
				"secondary" => "乙了又丈与及乞凡刃巾互丹乏井冗凶刈勾匂匹升厄双介孔屯幻弔斗斤爪牙且丘丙丼巨仙凹凸占叱召囚奴尻尼巧払氾汁込斥旦玄瓦甘甲矛伎仰伐伏充刑劣匠企吉叫吐吏壮如妃妄尽巡帆弐忙扱汎汚汗江芋芝迅旨旬肌朽朱朴缶臼舟串亜佐伺伸但伯伴克冶励却即呂含吟呉吹呈坑坊壱妖妥妊妨妙寿尿尾岐床廷弄抗抄択把抜扶抑沙汰沃沖沢沈没狂芯芳迎那邦阪忌忍戒戻攻更肘肝肖杉秀辛享依佳侍侮併免刹刺到劾卓叔呪坪奈奇奉奔妬姓宛宜尚屈岡岳岬弥弦征彼怪怖拉押拐拒拠拘拙拓抽抵拍披抱抹況沼泥泊泌沸泡狙苛茎苗茂迭迫邪邸阻附房旺昆昇股肩肯肢肪枕枢析杯枠欧殴炎炊炉采玩祈祉盲突虎阜斉亭侶侯俊侵促俗冠削勃勅卑卸厘叙咽哀咲垣契威姻孤封峡峠帥帝幽弧悔恒恨拶拭括挟拷挑洪浄津洞狭狩茨荒荘逃郊郎怨怠怒施昧是胎胆胞柿柵栃架枯柔柄某柳為牲珍甚畏疫皆盆眉盾冒砕窃糾耐臭虐虹衷訃訂貞赴軌香俺倹倒倣俸倫兼冥凄准凍剥剣剛剤剖匿唄哺唆唇哲唐埋娯娠姫娘宴宰宵峰徐悦悟悩挨捉挫振捜挿捕浦浸浜浮涙浪華逝逐逓途透陥陣恣恐恵恥恋恭扇拳敏脇脊脅脂朕胴桁核桑栽桟栓桃殊殉烈珠祥泰畝畜畔疾症疲眠砲称租秩袖被既粋索紛紡紋翁耗致般蚊衰託貢軒辱酎酌釜隻飢鬼竜曹乾偽偶偵偏剰勘唾喝啓唯埼堆執培婚婆寂尉崖崎崇崩庶庸彩彫惧惨惜悼捻捗掛掘掲控据措掃排描堀淫涯渇渓渋淑渉淡添涼猫猛猟葛萎菓菊菌逸逮郭陰陳陶陪隆陵患悠戚斜斬旋曽脚脱梗梨殻爽瓶痕盗眺窒符粗粘粒紺紹紳累羞粛舷舶虚蛍蛇袋訟豚貪貫販赦軟酔釈釣頃鹿麻斎亀僅偉傍募傘喉喩喚喫喪圏堪堅堕塚堤塔塀塁奥媛媒婿尋嵐項幅帽幾廃廊弾御循慌惰愉握援換搭揚揺湧渦滋湿渡湾猶葬遇遂遅遍隅随惑扉掌敢斑暁晶替普腕椅椎棺棋棚棟款欺殖煮焦琴畳疎痩痘痢硬硝硫裕筒粧絞紫絡蛮裂詠詐詔診訴貼越超距軸酢鈍閑雇雄雰須傲傾傑債催僧勧嗅嗣嘆塞填毀塊塑塗奨嫉嫁嫌寛寝廉彙微慄慨慎携搾摂搬溺滑溝滞滝漠滅溶猿蓋蓄遡遜違遣隙隔愚慈愁暇腎腫腺腰楷棄楼歳殿煙煩煎献禍禅痴睦睡督碁稚窟裾褐裸継羨艇虞虜蜂触詣詮該詰誇詳誉賂賊賄跡践跳較載酬酪鉛鉢鈴雅雷零飾飽靴頓頑頒鼓僕僚塾墨奪嫡寡寧彰徴憎慢摘漆漸漬滴漂漫漏蔑遮遭隠慕暦膜概熊獄瑠瘍罰碑稲端箸箋箇綻維綱緒網腐蜜誓誘豪貌踊辣酵酷銃銘閥雌需餅駆駄髪魂儀勲舗嘲嘱噴墜墳審寮履幣慶弊影徹憧憬憤撮撤撲潰潟潤澄潜蔽遵遷慰憂慮戯摯撃摩敷暫膝膚槽歓璃畿監盤罵罷稽稼稿穂窮窯範縁緩緊締縄衝褒誰謁請諾賭賜賠賓賦趣踪踏輝輩舞鋭鋳閲震霊餓餌頬駒駐魅黙儒凝壊墾壌壇壁嬢憶懐憾擁濁濃獲薫薪薦薄還避隣憩曇膳膨獣磨穏篤緻緯縛繁縫融衡諦謎諧諮謀諭謡賢醒麺錦錮錯錠錬隷頼骸償嚇擬擦濯懇戴曖臆燥爵犠環療瞳瞭矯礁繊翼聴謹謙謄購轄醜鍵鍋鍛闇霜韓頻鮮齢濫藤藍藩懲璧癖癒瞬礎穫襟糧繕繭翻覆贈鎌鎖鎮闘顎顕騎騒瀬藻爆璽羅簿繰艶覇譜蹴離霧韻髄鯨鶏麓麗懸欄籍譲醸鐘響騰艦躍露顧魔鶴籠襲驚鑑鬱");

?>

<!DOCTYPE html>
<meta charset="utf-8">
<head>
	<meta property="og:title" content="Radical Reactions" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="A data visualization about Japanese kanji and radicals'" />
	<meta property="og:image" content="http://www.stevengbraun.com/dev/radical-reactions/inc/screenshot.jpg" />
	
	<title>Radical Reactions</title>
	<style>
	@import 'https://fonts.googleapis.com/css?family=Catamaran:100,600|Noto+Sans:700';

	body {
		width: 100%;
		height: 100%;
		margin: 0px;
		padding: 0px;
	}
	
	#body_wrapper {
		width: 35%;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 300;
		margin: 0px;
		padding: 0px;
	}
	
	#header_svg {
		width: 80%;
		height: 40vh;
		position: absolute;
		top: 0px;
		right: 0px;
		z-index: 200;
	}

	#header {
		position: relative;
		height: 60vh;
		margin: 20px 0px 0px 0px;
		padding: 20px;
		text-align: left;
		font-family: "Noto Sans",sans-serif;
		font-size: 8em;
		font-weight: 700;
		line-height: 100%;
		letter-spacing: -8pt;
		cursor: default;
		box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
	}
	
	#vis_container {
		z-index: 100;
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100vh;
		background: #FCFCFC;
		box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
	}
	
	
	.content_container {
		position: relative;
		width: 100%;
		margin: 0px;
		padding: 40px;
		box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
	}
		
	.section_header {
		font-family: "Catamaran",sans-serif;
		text-transform: lowercase;
		font-variant: small-caps;
		font-size: 1.8em;	
		font-weight: bold;
		margin: 50px 0px 20px 0px;
		padding: 0px;
		border-bottom: 1px solid #333333;
		cursor: default;
		box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;		
	
	}
	
	.text {
		font-family: "Catamaran",sans-serif;
		font-size: 1.2em;	
		margin: 0px 0px 25px 0px;
		padding: 5px;
		cursor: default;
		text-align: justify;
		background-color: rgba(255,255,255,0.8);
		box-sizing: border-box;
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
	}
	

	
	a:link, a:visited {
		color: steelblue;
		text-decoration: none;
	}
	
	a:hover {
		text-decoration: underline;
	}
	
	
	.radical_label {
		dominant-baseline: central;
		text-anchor: middle;
		font-size: 0.6em;
		pointer-events: none;
	}

	#header_block {
		position: absolute;
		top: 0px;
		left: 0px;
		content: "";
		width: 100%;
	}

	#simulation_nav {
		position: absolute;
		top: 0px;
		right: 0px;
		margin: 0px;
		padding: 5px;
		display: flex;
		flex-direction: row;
		background-color: rgba(255,255,255,0.5);
	}
	
	.simulation_nav_item {
		margin: 2px;
		padding: 5px;
		font-family: "Catamaran",sans-serif;
		text-transform: lowercase;
		font-variant: small-caps;
		font-size: 1.4em;
		cursor: pointer;	
		
	}
	
	.kanji_element {
		margin: 1px 1px 1px 0px;
		font-size: 1.0em;
	}
	
	.gradeLabel {
		font-family: "Catamaran",sans-serif;
		font-size: 4.0em;
		text-anchor: end;
		dominant-baseline: middle;
		color: #CCCCCC;
	}
</style>
<script src="inc/lib/d3.v4.js"></script>
<script src="inc/lib/jquery-3.1.0.min.js"></script>
<script src="inc/lib/main_vis.js"></script>
</head>
<body>

<div id="vis_container">
	<div id="simulation_nav">
		<div class="simulation_nav_item" id="simulation_pause">Play</div>
		<div class="simulation_nav_item" id="simulation_restart">Restart</div>
	</div>
</div>
<div id="body_wrapper">
	<div id="header">Radical<br><span style="color:red;">Reactions</span></div>

	<div class="content_container">
		<div class="text">
		In the same way that matter is made up of atoms that combine in different ways to create our physical world, <i>radicals</i> are the building blocks of Japanese and Chinese characters. Radicals are ideographic subunits that carry clues about the meaning or reading of a character in the Japanese and Chinese languages; for example, one radical meaning <i>water</i> is often found in characters with meanings related to water, and similarly, other radicals perform the same function with meanings around <i>earth,</i> <i>fire,</i> <i>motion and movement</i>, parts of the <i>human body</i> and many others. If you can recognize the radical in a character, you can often guess its meaning or pronunciation even if you have never seen the character itself before. Below are some examples of kanji with shared radicals highlighted in blue (<i>water</i>) and red (<i>fire</i>).
		</div>
		<div class="text">
			<img src="inc/radicals.png" style="max-width:100%">
		</div>
		<div class="text">
		Learning radicals is critical to studying Japanese and Chinese, but it is not always easy to grasp the full universe of radicals and how they relate to all the characters in either language. In Japanese, there are more than 2000 characters (<i>kanji</i>) that are specified by the Japanese government to be essential for "daily use"; known as the <i>jouyou kanji</i> (常用漢字), these characters are taught in primary and secondary school to all Japanese students. For non-native speakers of Japanese, learning these kanji is a lifelong process, one in which the vastness of their readings and meanings continually unfolds in new contexts. 
		</div>
		<div class="text">This visualization seeks to illustrate this unfolding in a literally physical sense &mdash; one in which radicals are likened to atoms, from which molecular kanji arise. There are around 250 unique radicals that are found across all kanji (within the <i>jouyou kanji</i> and beyond), nearly all of which make appearances in kanji for daily use in many different possible combinations. Japanese students encounter these radicals in primary (grades 1 through 6) and secondary school education following standardized curricula, while non-native students of the language are exposed to them in less standardized ways. In any case, it is not always easy for students in either situation to cultivate a bird's eye view of the kanji they are learning and how they relate to others.
		</div>
		<div class="section_header">The Visualization</div>
		<div class="text">
		In this visualization, the universe of Japanese kanji comes into view as you step through the school years of the typical Japanese student. In each single full iteration, all of the kanji introduced in the respective school year materialize, along with their composite radicals. Each red circle represents a radical introduced in kanji for a given year, each of which is linked with small black circles representing those kanji. The gold colored circles represent radical clusters &mdash; radicals that appear in multiple kanji over each year. Gray lines indicate connections between individual years' radicals or kanji; red lines indicate links between radical clusters by way of <b>shared kanji between them</b>. As each radical cluster increases in radius (size), it becomes possible to see the frequency with which those radicals appear in shared kanji across the Japanese language, growing year over year as students study kanji in primary and secondary school.
		</div>
		<div class="text">
			<img src="inc/circles.png" style="max-width:100%">
		</div>
		
		<div class="text">
		For readability, this visualization only shows 20 of the most common radicals and their kanji, and only those kanji which are taught in Japanese grades 1 through 6. In each of the sections below, a list of kanji learned by students is provided according to grade level.
		</div>		
		<?php
		
		foreach($grades as $grade => $kanji_data) {
			print "<div class='section_header' id='grade_" . $grade . "'>Grade " . $grade . "</div>";
			print "<div class='text'>";
			$kanji = preg_split('/(?!^)(?=.)/u',$kanji_data);
			foreach($kanji as $k) {
				print "<span class='kanji_element'>" . $k . "</span>";		
			}
			print "</div>";
		}		
		
		?>
		<div class="section_header">Acknowledgments</div>
		<div class="text">This visualization was built in <a target="_blank" href="http://www.d3js.org">D3.js</a> by <a target="_blank" href="http://www.stevengbraun.com">Steven Braun</a>. The data are taken from <a target="_blank" href="http://www.csse.monash.edu.au/~jwb/kradinf.html">Jim Breen's KRADFILE</a>, a concordance of all kanji and their composite radicals. The code for this project is freely available on <a target="_blank" href="http://www.github.com/braunsg/radical-reactions">GitHub</a>.
		</div>

	</div>
</div>
</body>
</html>