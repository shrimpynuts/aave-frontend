import { ExternalLinkIcon, HandIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Box, Button, InputBase, SvgIcon, Typography } from '@mui/material';
import { Contract } from 'ethers';
import Link from 'next/link';
import { useState } from 'react';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { abi } from 'src/modules/custom/DomainRegistryABI';

export default function RegisterDomain() {
  const [domainName, setDomainName] = useState('');
  const { provider, currentAccount } = useWeb3Context();

  const address: `0x${string}` = `0xc7b8729571E4d6388cbb8D995d0f08703FD474b0`;
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const hostname = origin.split('//')[1];
  const isLocalhost = process.env.NODE_ENV === 'development';

  const onClaimClick = async () => {
    try {
      const signer = provider?.getSigner(currentAccount);
      const domainRegistryContractWithSigner = new Contract(address, abi, signer);
      domainRegistryContractWithSigner.register(domainName).catch((e: Error) => {
        if (e.toString().includes('transaction may fail')) {
          window.alert('Domain has been claimed.');
        }
      });
    } catch (e) {
      window.alert("Error claiming. Make sure you're connected to Goerli testnet.");
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        border={1}
        borderRadius={2}
        padding={8}
        boxShadow={1}
        marginTop={8}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="display1" sx={{ mb: 3 }}>
          <Trans>Register your domain</Trans>
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="row" mt={10}>
          <InputBase
            autoFocus
            sx={{
              flexGrow: 1,
              fontSize: 16,
              border: 1,
              borderRadius: 2,
              padding: 2,
              paddingX: 4,
              borderColor: '#bcbcbc',
              ':active': {
                borderColor: 'black',
              },
              ':focus-within': {
                borderColor: 'black',
              },
            }}
            placeholder="Search domain"
            value={domainName}
            onChange={(e) => {
              setDomainName(e.target.value);
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            startIcon={
              <SvgIcon>
                <HandIcon />
              </SvgIcon>
            }
            sx={{
              borderColor: '#bcbcbc',
              padding: 3,
              borderRadius: 2,
              marginLeft: 2,
            }}
            onClick={onClaimClick}
          >
            <Trans>Claim</Trans>
          </Button>

          <Link
            passHref
            href={`${isLocalhost ? 'http://' : 'https://'}${domainName}.${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={
                <SvgIcon>
                  <ExternalLinkIcon />
                </SvgIcon>
              }
              sx={{
                borderColor: '#bcbcbc',
                padding: 3,
                borderRadius: 2,
                marginLeft: 2,
              }}
            >
              <Trans>View</Trans>
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
