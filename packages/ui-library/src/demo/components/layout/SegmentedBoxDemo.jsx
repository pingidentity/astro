import React from "react";
import SegmentedBox, { boxSizes, SegmentedBoxMessage } from "ui-library/lib/components/layout/SegmentedBox";
import FormSearchBox from "ui-library/lib/components/forms/FormSearchBox";
import PipeRow from "ui-library/lib/components/layout/PipeRow";
import Link from "ui-library/lib/components/general/Link";
import HR from "ui-library/lib/components/general/HR";

/**
* @name SegmentedBoxDemo
* @memberof SegmentedBox
* @desc A demo for SegmentedBox
*/
const SegmentedBoxDemo = () => (
    <>
        <SegmentedBox
            border
            height={boxSizes.SM}
            topPanel={[
                <SegmentedBoxMessage key="message">Select One</SegmentedBoxMessage>,
                <FormSearchBox key="search" width="MAX" noSpacing />
            ]}
            bottomPanel={<PipeRow><Link>Only Selected</Link><Link>Select All</Link></PipeRow>}
            width={boxSizes.XS}
        >
            <ul>
                <li>Iosep Kinningley</li>
                <li>Iris Locock</li>
                <li>Salaidh Coughtrey</li>
                <li>Inglis Motte</li>
                <li>Annabel Chaddock</li>
                <li>Nate Furbank</li>
                <li>Audie Stolting</li>
                <li>Garth Mullenger</li>
                <li>Sax Templar</li>
                <li>Ashly Martusewicz</li>
                <li>Kay Fundell</li>
                <li>Baily Bandy</li>
                <li>Lauri Ruddiforth</li>
                <li>Arlee Kennicott</li>
                <li>Rickie Boschmann</li>
                <li>Moore Dible</li>
                <li>Leesa Gommowe</li>
                <li>Clifford Jauncey</li>
                <li>Gerome Errey</li>
                <li>Thorny Rippingall</li>
                <li>Donnajean Dablin</li>
                <li>Major Pinsent</li>
                <li>Kim Teresa</li>
                <li>Odell Kimmins</li>
                <li>Jelene Mathewson</li>
                <li>Tedda Tunmore</li>
                <li>Minerva Burk</li>
                <li>Giorgia Brambell</li>
                <li>Gerald Ughetti</li>
                <li>Amelina O'Hederscoll</li>
                <li>Sofie Wishart</li>
                <li>Law Phillott</li>
                <li>Noelle Beckhouse</li>
                <li>Valina Von Der Empten</li>
                <li>Birdie Langley</li>
                <li>Zuzana Tungate</li>
                <li>Laurens Rieger</li>
                <li>Perkin Berrey</li>
                <li>Kristan Butt Gow</li>
                <li>Matelda Battabee</li>
                <li>Keely Swindall</li>
                <li>Dannel McMillian</li>
                <li>Beck McCory</li>
                <li>Mara Doman</li>
                <li>Jaclin Roullier</li>
                <li>Lucille Vynoll</li>
                <li>Tull Dallaway</li>
                <li>Garret Deamer</li>
                <li>Ashla Kerans</li>
                <li>Athene Vizard</li>
                <li>Noah Bebbington</li>
                <li>Brock Wakeley</li>
                <li>Randall Fuzzard</li>
                <li>Reynold Eisig</li>
                <li>Jazmin Flintuff</li>
                <li>Elvin Seagrave</li>
                <li>Marty Bastian</li>
                <li>Jared Hann</li>
                <li>Caroljean Heyburn</li>
                <li>Rouvin Cordery</li>
                <li>Lila Filshin</li>
                <li>Elmo Alessandretti</li>
                <li>Renault Doulton</li>
                <li>Valaree Kidwell</li>
                <li>Crosby Werlock</li>
                <li>Ax Astbury</li>
                <li>Lorinda Ruddom</li>
                <li>Alexei MacKim</li>
                <li>Eldredge Turmel</li>
                <li>Alan Schwerin</li>
                <li>Reine Burkill</li>
                <li>Brose Dyster</li>
                <li>Free Walling</li>
                <li>Dre Sharram</li>
                <li>Dottie Pavel</li>
                <li>Xenos Humphries</li>
                <li>Johannah Belding</li>
                <li>Granger Duck</li>
                <li>Lynn Pawelec</li>
                <li>Andrea Benneton</li>
                <li>Jorge Leonardi</li>
                <li>Carlina Johnes</li>
                <li>Phyllida Pillman</li>
                <li>Selinda Mouse</li>
                <li>Cindee Hake</li>
                <li>Etti Hendriks</li>
                <li>Armand Etter</li>
                <li>Marietta Riseborough</li>
                <li>Terrill Halliwell</li>
                <li>Olivia Franscioni</li>
                <li>Isidora Haggie</li>
                <li>Nial Sibbs</li>
                <li>Jermain Camillo</li>
                <li>Hyacinth Ovett</li>
                <li>Danna Lanphier</li>
                <li>Eal Reavey</li>
                <li>Adda Fantonetti</li>
                <li>Yalonda Herculson</li>
                <li>Sigfried Kinver</li>
                <li>Kalvin Boow</li>
            </ul>
        </SegmentedBox>
        <HR />
        <SegmentedBox
            border
            height={boxSizes.SM}
            width={boxSizes.XS}
        >
            <ul>
                <li>Iosep Kinningley</li>
                <li>Iris Locock</li>
                <li>Salaidh Coughtrey</li>
                <li>Inglis Motte</li>
            </ul>
        </SegmentedBox>
    </>
);

export default SegmentedBoxDemo;