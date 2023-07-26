import BackgroundContainer from '../../Background';
import GetSecret from './GetSecret'

export default function Enable2Fa() {
    return (
        <div>
            <BackgroundContainer>
                <GetSecret />
            </BackgroundContainer>
        </div>
    )
}