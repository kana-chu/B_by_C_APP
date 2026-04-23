/**
 * @component P_CC_N_Home
 * @folder Pages/CalcCensus/Economic
 * @category Page
 * @description
 *    経済センサス計算画面
 *
 * @usage
 *
 *
 * @export default
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L_Layout from "@/Styles/Layout/L_Layout";

import { W_In_Button } from "@/Widgets/Inputs";
import CalcOptions from "@/Feature/Constants/CalcOptions";

// Widgets/Composite
import {
    W_Com_LabelSelectBox,
    W_Com_FileOrFolderPicker,
    W_Com_SaveFilePicker,
    W_Com_LabelMultiSelectBox,
} from "@/Widgets/Composite";

// Feedback
import { W_Feed_Pro_Bar } from "@/Widgets/FeedBack/Progress";
import { W_Feed_Mess_Message } from "@/Widgets/FeedBack/Message";

import {
    W_FA_CC_SheetNameBox,
    W_FA_CC_ItemSheetPreviewBox,
} from "@/Widgets/ForApp/CalcCensus";

// API（inspect 系）
import { F_Api_CC_SheetNameInspect } from "@/Feature/Api/CalcCensus/F_Api_CC_SheetNameInspect";
import { F_Api_CC_SheetItemInspect } from "@/Feature/Api/CalcCensus/F_Api_CC_SheetItemInspect";

// ✅ SSE Hook
import { useCalcCensusSSE } from "@/Feature/Hooks/CalcCensus/useCalcCensusSSE";

// Help
import P_CC_E_Help from "@/Pages/CalcCensus/Economic/P_CC_E_Help";


export default function P_CC_ECSV_Home() {
    const navigate = useNavigate();

    // -------------------------------------
    // navigation
    // -------------------------------------
    const handleGoHome = () => navigate("/");
    const handleGoBefore = () => navigate("/calc-census");

    // -------------------------------------
    // state（既存）
    // -------------------------------------
    const [filePath, setFilePath] = useState("");
    const [savePath, setSavePath] = useState("");
    const [sheetNameList, setSheetNameList] = useState([]);
    const [itemList, setItemList] = useState([]);

    const [rateSheet, setRateSheet] = useState("");
    const [itemSheet, setItemSheet] = useState("");
    const [dataSheetList, setDataSheetList] = useState([]);

    const [sheetNameOptions, setSheetNameOptions] = useState([]);

    const [exMeshSize, setExMeshSize] = useState(
        CalcOptions.exMeshSize.defaultValue
    );
    const [censusMeshSize, setCensusMeshSize] = useState(
        CalcOptions.economicMeshSize.defaultValue
    );

    // -------------------------------------
    // ✅ SSE Hook
    // -------------------------------------
    const {
        message,
        progress,
        isCalculating,
        startCalc,
    } = useCalcCensusSSE();

    // -------------------------------------
    // inspect 可否
    // -------------------------------------
    const canInspect = !!filePath;

    // -------------------------------------
    // ファイル inspect
    // -------------------------------------
    const handleInspect = async () => {
        if (!filePath) {
            return;
        }

        try {
            const data = await F_Api_CC_SheetNameInspect({
                file_path: filePath,
            });

            const list = Array.isArray(data.sheetNameList)
                ? data.sheetNameList
                : [];

            setSheetNameList(list);
            setSheetNameOptions(
                list.map(name => ({ label: name, value: name }))
            );
        } catch (err) {
            console.error(err);
        }
    };

    // -------------------------------------
    // item sheet preview
    // -------------------------------------
    useEffect(() => {
        if (!itemSheet) {
            setItemList([]);
            return;
        }

        const fetchItems = async () => {
            try {
                const data = await F_Api_CC_SheetItemInspect({
                    file_path: filePath,
                    sheet_name: itemSheet,
                });

                setItemList(Array.isArray(data.itemList) ? data.itemList : []);
            } catch (e) {
                console.error(e);
            }
        };

        fetchItems();
    }, [itemSheet, filePath]);

    // -------------------------------------
    // submit 可否
    // -------------------------------------
    const canSubmit = !!(
        filePath &&
        rateSheet &&
        itemSheet &&
        dataSheetList &&
        censusMeshSize &&
        exMeshSize &&
        savePath &&
        !isCalculating
    );

    // -------------------------------------
    // ✅ 計算実行（SSE）
    // -------------------------------------
    const handleSubmit = () => {
        if (!savePath) return;

        startCalc({
            file_path: filePath,
            rate_sheet: rateSheet,
            item_sheet: itemSheet,
            data_sheet_List: dataSheetList,
            census_meshSize: censusMeshSize,
            ex_meshSize: exMeshSize,
            save_path: savePath,
        });
    };

    // -------------------------------------
    // render
    // -------------------------------------
    return (
        <L_Layout
            title="経済センサス計算"
            onHome={handleGoHome}
            onBack={handleGoBefore}
            extraWindowContent={<P_CC_E_Help />}
        >
            <div className="flex flex-col gap-8 w-full">

                <W_Com_FileOrFolderPicker
                    label="① 元データファイル選択"
                    value={filePath}
                    onChange={setFilePath}
                />

                <W_In_Button
                    label="ファイル決定、内容読み込み"
                    onClick={handleInspect}
                    disabled={!canInspect}
                />

                <div className="grid grid-cols-[3fr_7fr] gap-8">
                    <W_FA_CC_SheetNameBox
                        header="シート一覧"
                        sheetNameList={sheetNameList}
                        height="450px"
                        width="100%"
                    />

                    <div className="flex flex-col gap-6 w-full">
                        <W_Com_LabelSelectBox
                            label="④ 割合シート選択"
                            value={rateSheet}
                            onChange={setRateSheet}
                            options={sheetNameOptions}
                        />

                        <W_Com_LabelSelectBox
                            label="④ 項目シート選択"
                            value={itemSheet}
                            onChange={setItemSheet}
                            options={sheetNameOptions}
                        />

                        <W_FA_CC_ItemSheetPreviewBox
                            itemList={itemList}
                            height="135px"
                            width="100%"
                        />

                        <W_Com_LabelMultiSelectBox
                            label="経済センサスデータシート選択"
                            values={dataSheetList}
                            onChange={setDataSheetList}
                            options={sheetNameOptions}
                        />
                    </div>
                </div>

                <W_Com_LabelSelectBox
                    label="経済センサスデータメッシュサイズ"
                    value={censusMeshSize}
                    onChange={setCensusMeshSize}
                    options={CalcOptions.economicMeshSize.options}
                />

                <W_Com_LabelSelectBox
                    label="出力メッシュサイズ選択"
                    value={exMeshSize}
                    onChange={setExMeshSize}
                    options={CalcOptions.exMeshSize.options}
                />

                <W_Com_SaveFilePicker
                    label="保存データファイル選択"
                    value={savePath}
                    onChange={setSavePath}
                    defaultName="new.xlsx"
                />

                <W_In_Button
                    label="計算実行"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                />

                {/* ✅ 進捗 & メッセージ */}
                <div className="flex flex-col gap-2 w-full">
                        <W_Feed_Pro_Bar
                            label="progress"
                            value={progress}
                        />
                    <W_Feed_Mess_Message text={message} />
                </div>
            </div>
        </L_Layout>
    );
}