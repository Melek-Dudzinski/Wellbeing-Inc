import Image from 'next/image';
import image17 from './images/image17.png';
import image18 from './images/image18.png';
import image19 from './images/image19.png';
import image20 from './images/image20.png';

export default function DiaryEntry() {
    return (
        <div className="diary">
            <div className="date">March 24, 2024</div>
            <div className="diary-container">
                <div className="diary-entry">
                    <div style={{ width: '40px', height: 'auto' }}>
                        <Image src={image17} alt="Image 25" />
                    </div>
                    <textarea className="content"></textarea>
                </div>
                <div className="diary-entry">
                    <div style={{ width: '40px', height: 'auto' }}>
                    <Image src={image20} alt="Image 25" />
                    </div>
                    <textarea className="content"></textarea>
                </div>
                <div className="diary-entry">
                    <div style={{ width: '40px', height: 'auto' }}>
                    <Image src={image18} alt="Image 25" />
                    </div>
                    <textarea className="content"></textarea>
                </div>
                <div className="diary-entry">
                    <div style={{ width: '40px', height: 'auto' }}>
                    <Image src={image19} alt="Image 25" />
                    </div>
                    <textarea className="content"></textarea>
                </div>
            </div>
        </div>
    );
}
